import fs from 'fs';
import matter from 'gray-matter';

async function main() {
    try {
        const filePath = './testing.md';
        const file = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(file);
        console.log(parsed);
    } catch (e) {
        console.error(e);
    }
}

main();
