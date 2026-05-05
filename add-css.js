const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Insert link to custom CSS after Water.css link
const waterLink = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">';
const customLink = '<link rel="stylesheet" href="/css/style.css">';
if (html.includes(waterLink) && !html.includes(customLink)) {
    html = html.replace(waterLink, waterLink + '\n    ' + customLink);
    fs.writeFileSync(indexPath, html);
    console.log('Added custom CSS link');
} else {
    console.log('Already added or water.css not found');
}