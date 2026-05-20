
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Customer } from './Customer';
import { Driver } from './Driver';
import { Route } from './Route';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column()
    status: string;

    @Column('float')
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @ManyToOne(() => Driver, (driver) => driver.orders)
    driver: Driver;

    @ManyToOne(() => Route)
    route: Route;

    constructor(data: Partial<Order>) {
        Object.assign(this, data);
    }
}