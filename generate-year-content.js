#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CACHE_DIR = path.join(__dirname, 'articles-cache');
const TOPICS_FILE = path.join(__dirname, '..', 'productivity-article-topics.md');

// Article template
const template = (number, title, date, description) => `---
title: "${title}"
date: ${date}
description: "${description}"
affiliateLinks: true
---

## Introduction

This article explores ${title.toLowerCase()}. We'll review the best tools, techniques, and strategies to help you ${description.toLowerCase().replace('review', 'improve').replace('comparison', 'choose the right')}.

## Key Considerations

When evaluating ${title.toLowerCase().split(' ')[0]} options, consider:

1. **Your specific needs** – What problem are you trying to solve?
2. **Budget** – Free vs paid options
3. **Learning curve** – How long to become productive?
4. **Integration** – Does it work with your existing tools?
5. **Scalability** – Will it grow with you?

## Top Recommendations

### 1. **Tool/Service A** – Best Overall

**What it does:** [Brief description]
**Best for:** [Target audience]
**Pricing:** [Price range]
**Why we recommend it:** [Key benefits]

[**Try Tool A**](https://example.com) *(affiliate link)*

### 2. **Tool/Service B** – Best Value

**What it does:** [Brief description]
**Best for:** [Target audience]
**Pricing:** [Price range]
**Why we recommend it:** [Key benefits]

[**Try Tool B**](https://example.com) *(affiliate link)*

### 3. **Tool/Service C** – Best for Experts

**What it does:** [Brief description]
**Best for:** [Target audience]
**Pricing:** [Price range]
**Why we recommend it:** [Key benefits]

[**Try Tool C**](https://example.com) *(affiliate link)*

## Implementation Guide

1. **Start small** – Pick one tool and use it for 2 weeks
2. **Measure results** – Track time saved or output increase
3. **Optimize** – Adjust settings based on your workflow
4. **Scale** – Add more features or tools gradually

## Common Mistakes to Avoid

- Over‑complicating your setup
- Switching tools too frequently
- Not training team members
- Ignoring integration possibilities

**Affiliate Disclosure:** We earn commissions when you sign up through our links.`;

// Read topics
const topicsContent = fs.readFileSync(TOPICS_FILE, 'utf8');
const lines = topicsContent.split('\n');
const topics = [];

let inRemaining = false;
for (const line of lines) {
  if (line.includes('## Categories for Remaining')) {
    inRemaining = true;
    continue;
  }
  if (inRemaining && line.match(/^\d+\.\s+.+/)) {
    const match = line.match(/^\d+\.\s+(.+)/);
    if (match) {
      topics.push(match[1].trim());
    }
  }
}

// Generate dates (weekly starting from last existing article)
const startDate = new Date('2026-07-26'); // Last existing article date
const existingCount = fs.readdirSync(CACHE_DIR)
  .filter(f => f.endsWith('.md'))
  .length;

console.log(`Found ${topics.length} topics in list`);
console.log(`Existing articles in cache: ${existingCount}`);

// Create missing articles
topics.slice(0, 52 - existingCount).forEach((topic, index) => {
  const articleNum = existingCount + index + 1;
  const articleDate = new Date(startDate);
  articleDate.setDate(articleDate.getDate() + 7 * (index + 1));
  
  const dateStr = articleDate.toISOString().split('T')[0];
  const filename = `${articleNum.toString().padStart(2, '0')}-${topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
  const filepath = path.join(CACHE_DIR, filename);
  
  // Generate description based on topic
  let description = `Review and comparison of ${topic.toLowerCase()}`;
  if (topic.includes('Tools')) description = `Best tools for ${topic.toLowerCase().replace(' tools', '')}`;
  if (topic.includes('Method')) description = `How to implement ${topic.toLowerCase()} in your workflow`;
  if (topic.includes('Productivity for')) description = `Specialized productivity strategies for ${topic.toLowerCase().replace('productivity for ', '')}`;
  
  const content = template(articleNum, topic, dateStr, description);
  
  fs.writeFileSync(filepath, content);
  console.log(`Created: ${filename} (${dateStr})`);
});

console.log(`\nTotal articles in cache: ${existingCount + topics.slice(0, 52 - existingCount).length}`);
console.log(`Enough for ${Math.floor((existingCount + topics.slice(0, 52 - existingCount).length) / 4.33)} months of weekly publishing`);