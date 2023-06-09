import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import { type DataDates } from 'types';

const fileKeyMap = {
    publish: 'datePublished',
    modify: 'dateModified',
};

export function dateInjection() {
    try {
        const fileKey = process.argv[1].split('/').pop()?.split('.')[0];
        const arg = process.argv[2];
        if (!arg) {
            throw new Error('No file path provided');
        }
        const file = fs.readFileSync(arg, 'utf-8');
        const parsed = matter(file);
        const data = parsed.data as DataDates;
        const formattedDate = dayjs().format('YYYY-MM-DDTHH:mm:ssZ');
        const dateKey = fileKeyMap[fileKey as keyof typeof fileKeyMap];
        const newData = { ...data, [dateKey]: formattedDate };
        const newFile = matter.stringify(parsed.content, newData, {
            language: 'yml',
        });
        // fs.writeFileSync('./testing.md', newFile);
        fs.writeFileSync(arg, newFile);
    } catch (e) {
        console.error(e);
    }
}
