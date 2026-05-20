
import {Driver} from '../../domain/entities/Driver';

export interface IDriverRepository {
    create(driver: Omit<Driver, 'driverId'>): Promise<Driver>;
    findById(id: number): Promise<Driver | null>;
    findAll(): Promise<Driver[]>;
    save(driver: Driver): Promise<Driver>;
    saveMany(drivers: Driver[]): Promise<Driver[]>;
}