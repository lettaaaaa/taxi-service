
export interface IDataImportService {
    importTaxiData(filePath: string): Promise<void>;
}