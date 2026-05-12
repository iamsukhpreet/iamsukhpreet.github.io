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

function cleanQuotes() {
    const files = fs.readdirSync(quotesDir).filter(f => f.endsWith('.md'));
    const quotes = [];

    console.log(`Reading ${files.length} files...`);

    files.forEach(file => {
        const content = fs.readFileSync(path.join(quotesDir, file), 'utf-8');
        const quoteMatch = content.match(/quote: "(.*)"/);
        if (quoteMatch) {
            quotes.push({
                file,
                text: quoteMatch[1]
            });
        }
    });

    const toDelete = new Set();
    for (let i = 0; i < quotes.length; i++) {
        if (toDelete.has(quotes[i].file)) continue;
        for (let j = i + 1; j < quotes.length; j++) {
            if (toDelete.has(quotes[j].file)) continue;
            
            const similarity = getSimilarity(quotes[i].text, quotes[j].text);
            if (similarity > 0.5) {
                toDelete.add(quotes[j].file);
            }
        }
    }

    console.log(`Found ${toDelete.size} quotes with >50% similarity. Deleting...`);
    toDelete.forEach(file => {
        fs.unlinkSync(path.join(quotesDir, file));
    });

    console.log(`Cleanup complete. ${files.length - toDelete.size} unique quotes remain.`);
}

cleanQuotes();
