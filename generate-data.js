const fs = require('fs');
const path = require('path');

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

fs.writeFileSync(
    path.join(__dirname, 'articles.json'),
    JSON.stringify(articles, null, 2)
);

console.log('Generated articles.json with', articles.length, 'articles');