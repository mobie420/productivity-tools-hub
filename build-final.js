const fs = require('fs');
const path = require('path');

// 1. Generate articles.json
const articlesMdDir = path.join(__dirname, 'articles-md');
const articles = [];
fs.readdirSync(articlesMdDir).forEach(file => {
    if (!file.endsWith('.md')) return;
    const content = fs.readFileSync(path.join(articlesMdDir, file), 'utf8');
    const parts = content.split('---');
    if (parts.length < 3) return;
    const frontMatter = parts[1].trim();
    
    let title = '', date = '', description = '';
    frontMatter.split('\n').forEach(line => {
        if (line.startsWith('title:')) title = line.replace('title:', '').trim().replace(/"/g, '');
        if (line.startsWith('date:')) date = line.replace('date:', '').trim();
        if (line.startsWith('description:')) description = line.replace('description:', '').trim().replace(/"/g, '');
    });
    
    articles.push({
        slug: file.replace('.md', ''),
        title,
        date,
        description,
        url: `/articles/${file.replace('.md', '.html')}`
    });
});

// 2. Generate article cards HTML
let cardsHtml = '';
articles.forEach(article => {
    cardsHtml += `
    <div class="article-card">
        <h3><a href="${article.url}">${article.title}</a></h3>
        <p>${article.description}</p>
        <small>📅 ${article.date} | 💰 Affiliate links included</small>
    </div>
    `;
});

// 3. Read index template
let indexHtml = fs.readFileSync(path.join(__dirname, 'index-template.html'), 'utf8');

// 4. Replace the article-grid div content
const startMarker = '<div class="article-grid">';
const endMarker = '</div>';
const startIdx = indexHtml.indexOf(startMarker);
const endIdx = indexHtml.indexOf(endMarker, startIdx + startMarker.length);
if (startIdx !== -1 && endIdx !== -1) {
    const before = indexHtml.substring(0, startIdx + startMarker.length);
    const after = indexHtml.substring(endIdx);
    indexHtml = before + cardsHtml + after;
}

// 5. Write final index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
console.log('Updated index.html with dynamic articles');

// 6. Build articles HTML (reuse previous build script)
require('./build.js');