
import { ChildEntity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Car } from './Car';
import { Order } from './Order';

@ChildEntity('driver')
export class Driver extends User {
    @Column('integer')
    totalTrips: number;

    @Column('float')
    driverRating: number;

    @Column()
    driverLicense: string;

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car;

    @OneToMany(() => Order, (order) => order.driver)
    orders: Order[];

    constructor(data: Partial<Driver>) {
        super(data);
        Object.assign(this, data);
    }
}