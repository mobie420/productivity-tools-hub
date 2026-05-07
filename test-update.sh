#!/bin/bash
# Test the update scheduler
cd "$(dirname "$0")"

echo "🧪 Testing article update scheduler..."
echo "Articles in cache: $(find articles-cache -name '*.md' | wc -l)"
echo "Articles live: $(find articles-md -name '*.md' | wc -l)"

echo ""
echo "Running update-scheduler.js..."
node update-scheduler.js

echo ""
echo "After update:"
echo "Articles in cache: $(find articles-cache -name '*.md' | wc -l)"
echo "Articles live: $(find articles-md -name '*.md' | wc -l)"
echo "Generated HTML: $(find articles -name '*.html' | wc -l)"