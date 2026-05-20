
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn()
    carId: number;

    @Column()
    model: string;

    @Column()
    plateNumber: string;

    @Column()
    color: string;

    @Column()
    type: string;

    @Column({ default: true })
    isAvailable: boolean;

    constructor(data: Partial<Car>) {
        Object.assign(this, data);
    }
}