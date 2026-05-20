
import { Car } from '../../domain/entities/Car';

export interface ICarRepository {
    create(car: Omit<Car, 'carId'>): Promise<Car>;
    findById(id: number): Promise<Car | null>;
    findAll(): Promise<Car[]>;
    save(car: Car): Promise<Car>;
    saveMany(cars: Car[]): Promise<Car[]>;
}