import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { type DataDates } from 'types';

async function main() {
    try {
        const arg = process.argv[2];
        if (!arg) {
            throw new Error('No file path provided');
        }
        const file = fs.readFileSync(arg, 'utf-8');
        const parsed = matter(file);
        const data = parsed.data as DataDates;
        const datePublished = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
        const newData = { ...data, datePublished };
        const newFile = matter.stringify(parsed.content, newData, {
            language: 'yml',
        });
        fs.writeFileSync('./testing.md', newFile);
    } catch (e) {
        console.error(e);
    }
}

main();
