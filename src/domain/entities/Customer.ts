
import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { Order } from './Order';

@ChildEntity('customer')
export class Customer extends User {
    @Column('integer')
    totalTrips: number;

    @Column('float')
    customerRating: number;

    @Column('simple-array', { nullable: true })
    favoriteAddresses: string[];

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    constructor(data: Partial<Customer>) {
        super(data);
        Object.assign(this, data);
    }
}