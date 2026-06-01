
const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');
const idRegex = /id:\s*["']([^"']+)["']/g;
const numericIdRegex = /id:\s*(\d+)/g;

let match;
const ids = {};

while ((match = idRegex.exec(content)) !== null) {
  const id = match[1];
  ids[id] = (ids[id] || 0) + 1;
}

while ((match = numericIdRegex.exec(content)) !== null) {
  const id = match[1];
  ids[id] = (ids[id] || 0) + 1;
}

for (const id in ids) {
  if (ids[id] > 1) {
    console.log(`Duplicate ID found: ${id} (${ids[id]} occurrences)`);
  }
}
