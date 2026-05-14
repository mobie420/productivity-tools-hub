#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ARTICLES_CACHE_DIR = path.join(__dirname, 'articles-cache');
const ARTICLES_MD_DIR = path.join(__dirname, 'articles-md');
const ARTICLES_OUT_DIR = path.join(__dirname, 'articles');

console.log('ð Article Update Scheduler');
console.log('==========================');

// 1. Check for cached articles
const cachedFiles = fs.readdirSync(ARTICLES_CACHE_DIR)
  .filter(f => f.endsWith('.md'))
  .sort();

if (cachedFiles.length === 0) {
  console.log('â No cached articles found in', ARTICLES_CACHE_DIR);
  process.exit(1);
}

console.log(`ð Found ${cachedFiles.length} cached articles`);

// 2. Find the next article to publish (by filename order)

// Process first N articles
const N = 5;
const articlesToProcess = cachedFiles.slice(0, N);
console.log(`🚀 Processing ${articlesToProcess.length} articles`);
for (const nextArticle of articlesToProcess) {
    const nextArticle = cachedFiles[0];
    console.log(`ð Next article to publish: ${nextArticle}`);
    
    // 3. Move it to articles-md/
    const sourcePath = path.join(ARTICLES_CACHE_DIR, nextArticle);
    const destPath = path.join(ARTICLES_MD_DIR, nextArticle);
    
    fs.copyFileSync(sourcePath, destPath);
    console.log(`â Copied to ${destPath}`);
    
    // 4. Delete from cache (or move to archive)
    const archiveDir = path.join(__dirname, 'articles-archive');
    if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir, { recursive: true });
    fs.copyFileSync(sourcePath, path.join(archiveDir, nextArticle));
    fs.unlinkSync(sourcePath);
    console.log(`ð¦ Archived and removed from cache`);
    
}

// 5. Run build scripts
console.log('ð¨ Building site...');
try {
  // Build articles (use simple build if marked fails)
  try {
    execSync('node build.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (error) {
    console.log('â ï¸ Standard build failed, trying simple build...');
    execSync('node simple-build.js', { cwd: __dirname, stdio: 'inherit' });
  }
  
  // Update homepage with new article grid
  execSync('node build-final.js', { cwd: __dirname, stdio: 'inherit' });
  
  console.log('â Build complete');
} catch (error) {
  console.error('â Build failed:', error.message);
  process.exit(1);
}

// 6. Git commit and push (if configured)
const gitRemote = fs.readFileSync(path.join(__dirname, '.git/config'), 'utf8');
if (gitRemote.includes('github.com')) {
  console.log('ð Pushing to GitHub...');
  try {
    execSync('git add .', { cwd: __dirname, stdio: 'inherit' });
    execSync(`git commit -m "Auto-publish: ${nextArticle.replace('.md', '')}"`, { 
      cwd: __dirname, 
      stdio: 'inherit' 
    });
    execSync('git push origin main', { cwd: __dirname, stdio: 'inherit' });
    console.log('â Pushed to GitHub');
  } catch (error) {
    console.warn('â ï¸ Git push failed (might be no changes or auth issue):', error.message);
  }
} else {
  console.log('â¹ï¸ No GitHub remote configured, skipping push');
}

console.log('\nð Update complete!');
console.log(`ð ${cachedFiles.length - 1} articles remaining in cache`);
console.log(`ð Next update scheduled for next week`);