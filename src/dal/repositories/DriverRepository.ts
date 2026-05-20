
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Driver } from '../../domain/entities/Driver';
import { IDriverRepository } from '../interfaces/IDriverRepository';

@injectable()
export class DriverRepository implements IDriverRepository {
    private repository: Repository<Driver>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Driver);
    }

    async create(driverData: Omit<Driver, 'driverId'>): Promise<Driver> {
        const driver = this.repository.create(driverData);
        return await this.repository.save(driver);
    }

    async findById(id: number): Promise<Driver | null> {
        return await this.repository.findOne({ where: { userId: id } });
    }

    async findAll(): Promise<Driver[]> {
        return await this.repository.find();
    }

    async save(driver: Driver): Promise<Driver> {
        return await this.repository.save(driver);
    }

    async saveMany(drivers: Driver[]): Promise<Driver[]> {
        return await this.repository.save(drivers);
    }
}