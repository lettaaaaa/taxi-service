
import { Order } from '../../domain/entities/Order';

export interface IOrderRepository {
    create(order: Omit<Order, 'orderId'>): Promise<Order>;
    findById(id: number): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    save(order: Order): Promise<Order>;
    saveMany(orders: Order[]): Promise<Order[]>;
}