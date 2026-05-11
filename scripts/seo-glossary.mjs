import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src', 'data', 'glossary');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let updated = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Improve description for SEO
  content = content.replace(/description:\s*"(.*?)"/, (match, p1) => {
    if (!p1.toLowerCase().includes("psychology") && !p1.toLowerCase().includes("mental health")) {
      updated++;
      const termName = file.replace('.md', '').replace(/-/g, ' ');
      return `description: "Psychological definition and mental health impact of ${termName}: ${p1}"`;
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content);
}

console.log(`Updated ${updated} glossary files with SEO descriptions.`);