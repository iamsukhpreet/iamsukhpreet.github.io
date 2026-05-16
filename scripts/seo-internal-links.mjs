import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'data', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const relatedBlock = `

---
### Explore More Mental Health Resources
- **[Mental Health Glossary](/glossary):** Explore our comprehensive plain-English guide to psychological terms to better understand mental health concepts.
- **[Words of Wisdom](/quotes):** Find inspiration and daily reflection in our collection of mental health quotes.
- **[Community Q&A](/qa):** Read common questions about therapy and mental well-being, or ask your own anonymously.
`;

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes("### Explore More Mental Health Resources")) {
    content += relatedBlock;
    fs.writeFileSync(filePath, content);
    updated++;
  }
}

// eslint-disable-next-line no-console
console.log(`Appended internal SEO linking block to ${updated} blog posts.`);