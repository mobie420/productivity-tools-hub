const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const articlesMdDir = path.join(__dirname, 'articles-md');
const articlesOutDir = path.join(__dirname, 'articles');
const template = fs.readFileSync(path.join(__dirname, 'article-template.html'), 'utf8');

// Ensure output directory
if (!fs.existsSync(articlesOutDir)) fs.mkdirSync(articlesOutDir, { recursive: true });

// Process each markdown file
fs.readdirSync(articlesMdDir).forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const content = fs.readFileSync(path.join(articlesMdDir, file), 'utf8');
    // Simple front matter parsing (--- separated)
    const parts = content.split('---');
    if (parts.length < 3) return;
    const frontMatter = parts[1].trim();
    const body = parts.slice(2).join('---').trim();
    
    // Extract title, date, description (simple)
    let title = 'Article';
    let date = '2026-01-01';
    let description = '';
    frontMatter.split('\n').forEach(line => {
        if (line.startsWith('title:')) title = line.replace('title:', '').trim().replace(/"/g, '');
        if (line.startsWith('date:')) date = line.replace('date:', '').trim();
        if (line.startsWith('description:')) description = line.replace('description:', '').trim().replace(/"/g, '');
    });
    
    const htmlContent = marked(body);
    const html = template
        .replace(/{{title}}/g, title)
        .replace(/{{date}}/g, date)
        .replace(/{{description}}/g, description)
        .replace(/{{content}}/g, htmlContent);
    
    const outFile = file.replace('.md', '.html');
    fs.writeFileSync(path.join(articlesOutDir, outFile), html);
    console.log(`Generated: ${outFile}`);
});

// Copy static assets
const copyDir = (src, dest) => {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(item => {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    });
};

['css', 'js', 'images'].forEach(dir => {
    copyDir(path.join(__dirname, dir), path.join(articlesOutDir, '..', dir));
});

console.log('Build complete!');