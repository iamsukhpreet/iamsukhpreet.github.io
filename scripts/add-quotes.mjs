import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const quotesDir = path.join(__dirname, '..', 'src', 'data', 'quotes');

function getSimilarity(s1, s2) {
    const words1 = new Set(s1.toLowerCase().split(/\s+/));
    const words2 = new Set(s2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
}

function addQuotes(newQuotesJson) {
    const existingFiles = fs.readdirSync(quotesDir).filter(f => f.endsWith('.md'));
    const existingQuotes = [];

    existingFiles.forEach(file => {
        const content = fs.readFileSync(path.join(quotesDir, file), 'utf-8');
        const quoteMatch = content.match(/quote: "(.*)"/);
        if (quoteMatch) {
            existingQuotes.push(quoteMatch[1]);
        }
    });

    let nextCounter = 1;
    // Find highest counter
    existingFiles.forEach(file => {
        const match = file.match(/quote-(\d+)\.md/);
        if (match) {
            const num = parseInt(match[1]);
            if (num >= nextCounter) nextCounter = num + 1;
        }
    });

    let addedCount = 0;
    newQuotesJson.forEach(q => {
        const isDuplicate = existingQuotes.some(existing => getSimilarity(existing, q.quote) > 0.5);
        if (!isDuplicate) {
            const filename = `quote-${nextCounter}.md`;
            const markdown = `---
quote: "${q.quote.replace(/"/g, '\\"')}"
author: "${q.author}"
context: "${q.theme}"
tags: ${JSON.stringify([...new Set([...(q.tags || []), "random"])])}
---

${q.reflection || q.content}
`;
            fs.writeFileSync(path.join(quotesDir, filename), markdown);
            existingQuotes.push(q.quote);
            nextCounter++;
            addedCount++;
        }
    });

    console.log(`Added ${addedCount} new unique quotes.`);
}

const dataDir = path.join(__dirname, '..', 'src', 'data');
const tempFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('temp_group_') && f.endsWith('.json'));

let allNewQuotes = [];

tempFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        allNewQuotes = allNewQuotes.concat(data);
        fs.unlinkSync(filePath); // Delete after reading
    } catch (e) {
        console.error(`Error reading ${file}:`, e);
    }
});

if (allNewQuotes.length > 0) {
    addQuotes(allNewQuotes);
} else {
    console.log("No new quotes found in temp files.");
}
