#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter (no external dependencies)
function simpleMarkdownToHtml(md) {
  return md
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    // Paragraphs
    .replace(/\n\n(?!<[^>]+>)(.+?)(?=\n\n|$)/gs, '<p>$1</p>')
    // Line breaks
    .replace(/\n/g, '<br>');
}

const articlesMdDir = path.join(__dirname, 'articles-md');
const articlesOutDir = path.join(__dirname, 'articles');
const template = fs.readFileSync(path.join(__dirname, 'article-template.html'), 'utf8');

// Ensure output directory
if (!fs.existsSync(articlesOutDir)) fs.mkdirSync(articlesOutDir, { recursive: true });

// Process each markdown file
const files = fs.readdirSync(articlesMdDir).filter(f => f.endsWith('.md'));
console.log(`Processing ${files.length} markdown files...`);

files.forEach(file => {
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
  
  const htmlContent = simpleMarkdownToHtml(body);
  const html = template
    .replace(/{{title}}/g, title)
    .replace(/{{date}}/g, date)
    .replace(/{{description}}/g, description)
    .replace(/{{content}}/g, htmlContent);
  
  const outFile = file.replace('.md', '.html');
  fs.writeFileSync(path.join(articlesOutDir, outFile), html);
  console.log(`Generated: ${outFile}`);
});

console.log('Simple build complete!');