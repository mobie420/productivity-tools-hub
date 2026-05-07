#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load mapping
const mapPath = path.join(__dirname, 'affiliate-map.json');
if (!fs.existsSync(mapPath)) {
    console.error('⚠️  affiliate-map.json not found');
    process.exit(1);
}
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

const amazonId = map.amazon;
if (!amazonId || amazonId === 'YOUR_AMAZON_TRACKING_ID') {
    console.error('⚠️  No Amazon tracking ID found in affiliate-map.json');
    process.exit(1);
}

console.log(`🔗 Replacing Amazon links with tag: ${amazonId}`);

// Process all HTML files
const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) {
    console.error('⚠️  articles directory not found');
    process.exit(1);
}

const htmlFiles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html'));

let totalReplaced = 0;
htmlFiles.forEach(file => {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace Amazon links
    const amazonLinkRegex = /(https:\/\/amazon\.com\/dp\/[A-Z0-9]+)(?![?&])/g;
    const matches = content.match(amazonLinkRegex);
    
    if (matches) {
        matches.forEach(match => {
            const newLink = `${match}?tag=${amazonId}`;
            content = content.replace(new RegExp(match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newLink);
            totalReplaced++;
        });
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated ${file}: ${matches.length} links`);
    }
});

console.log(`\n🎉 Done! Replaced ${totalReplaced} Amazon links across ${htmlFiles.length} articles.`);

// Also update index.html if there are Amazon links
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    const amazonLinkRegex = /(https:\/\/amazon\.com\/dp\/[A-Z0-9]+)(?![?&])/g;
    const matches = content.match(amazonLinkRegex);
    
    if (matches) {
        matches.forEach(match => {
            const newLink = `${match}?tag=${amazonId}`;
            content = content.replace(new RegExp(match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newLink);
            totalReplaced++;
        });
        fs.writeFileSync(indexPath, content);
        console.log(`✅ Updated index.html: ${matches.length} links`);
    }
}

console.log(`\n📊 Total links replaced: ${totalReplaced}`);
console.log(`\nNext steps:`);
console.log(`1. Commit and push to GitHub: git add . && git commit -m "Add Amazon affiliate tag ${amazonId}" && git push`);
console.log(`2. Your site will update automatically via GitHub Pages`);