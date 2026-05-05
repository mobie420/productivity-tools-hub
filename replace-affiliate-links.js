#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Load mapping
const mapPath = path.join(__dirname, 'affiliate-map.json');
if (!fs.existsSync(mapPath)) {
    console.error('⚠️  affiliate-map.json not found. Create it from the template.');
    process.exit(1);
}
const map = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Helper to replace in file
function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    replacements.forEach(([search, replace]) => {
        if (content.includes(search)) {
            content = content.split(search).join(replace);
            changed = true;
        }
    });
    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${filePath}`);
    }
}

// Amazon placeholder
if (map.amazon && map.amazon !== 'YOUR_AMAZON_TRACKING_ID') {
    const amazonSearch = 'amazon.com/dp/';
    const amazonReplace = `amazon.com/dp/$1?tag=${map.amazon}`;
    // We'll need to process HTML files for Amazon links
    // For simplicity, we'll just log
    console.log('🔗 Amazon tracking ID ready:', map.amazon);
    console.log('   Manually replace Amazon links with ?tag=' + map.amazon);
}

// ConvertKit form
if (map.convertkit && map.convertkit !== 'YOUR_CONVERTKIT_FORM_URL') {
    const ckSearch = 'https://app.convertkit.com/forms/XXXXXX/subscriptions';
    replaceInFile(path.join(__dirname, 'index.html'), [[ckSearch, map.convertkit]]);
}

// Google Analytics
if (map.googleAnalytics && map.googleAnalytics !== 'G-XXXXXXXXXX') {
    const gaSearch = 'G-XXXXXX';
    replaceInFile(path.join(__dirname, 'index.html'), [[gaSearch, map.googleAnalytics]]);
}

// ShareASale placeholders (simplified)
const shareasaleMap = map.shareasale;
if (shareasaleMap) {
    console.log('🔗 ShareASale mapping loaded. Replace placeholder links in articles manually.');
    console.log('   Consider using a text editor with find/replace.');
}

console.log('\n🎉 Done. Remember to also update links in articles/*.html manually.');
console.log('   For bulk replacement, consider using a tool like sed or VS Code replace in folder.');