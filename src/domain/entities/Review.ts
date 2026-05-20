
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number;

    @Column('float')
    rating: number;

    @Column('text')
    comment: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;

    constructor(data: Partial<Review>) {
        Object.assign(this, data);
    }
}