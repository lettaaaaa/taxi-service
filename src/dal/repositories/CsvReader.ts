
import { injectable } from 'tsyringe';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import { ICsvReader, CsvRow } from '../interfaces/ICsvReader';

@injectable()
export class CsvReader implements ICsvReader {
    async readCsv(filePath: string): Promise<CsvRow[]> {
        return new Promise((resolve, reject) => {
            const results: CsvRow[] = [];
            
            if (!fs.existsSync(filePath)) {
                reject(new Error("Файл не знайдено"));
            }

            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    }
}