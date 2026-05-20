
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../../domain/entities/Order';
import { IOrderRepository } from '../interfaces/IOrderRepository';

@injectable()
export class OrderRepository implements IOrderRepository {
    private repository: Repository<Order>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Order);
    }

    async create(orderData: Omit<Order, 'orderId'>): Promise<Order> {
        const order = this.repository.create(orderData);
        return await this.repository.save(order);
    }

    async findById(id: number): Promise<Order | null> {
        return await this.repository.findOne({ 
            where: { orderId: id },
            relations: ['customer', 'driver', 'route']
        });
    }

    async findAll(): Promise<Order[]> {
        return await this.repository.find({ relations: ['customer', 'driver'] });
    }

    async save(order: Order): Promise<Order> {
        return await this.repository.save(order);
    }

    async saveMany(orders: Order[]): Promise<Order[]> {
        return await this.repository.save(orders);
    }
}