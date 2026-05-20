
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Car } from '../../domain/entities/Car';
import { ICarRepository } from '../interfaces/ICarRepository';

@injectable()
export class CarRepository implements ICarRepository {
    private repository: Repository<Car>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Car);
    }

    async create(carData: Omit<Car, 'carId'>): Promise<Car> {
        const car = this.repository.create(carData);
        return await this.repository.save(car);
    }

    async findById(id: number): Promise<Car | null> {
        return await this.repository.findOne({ where: { carId: id } });
    }

    async findAll(): Promise<Car[]> {
        return await this.repository.find();
    }

    async save(car: Car): Promise<Car> {
        return await this.repository.save(car);
    }

    async saveMany(cars: Car[]): Promise<Car[]> {
        return await this.repository.save(cars);
    }
}