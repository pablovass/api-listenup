import { Frase } from '@/types';
import path from 'path';
import fs from 'fs/promises';

export async function getFrases(): Promise<Frase[]> {
    const jsonDirectory = path.join(process.cwd(), 'frases_json');
    const filePath = path.join(jsonDirectory, 'frases.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const frases: Frase[] = JSON.parse(fileContents);
    return frases;
}
