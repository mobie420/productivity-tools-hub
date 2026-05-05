const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, 'articles.json'), 'utf8'));

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

console.log(cardsHtml);