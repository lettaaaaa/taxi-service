
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Customer } from '../../domain/entities/Customer';
import { ICustomerRepository } from '../interfaces/ICustomerRepository';

@injectable()
export class CustomerRepository implements ICustomerRepository {
    private repository: Repository<Customer>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Customer);
    }

    async create(customerData: Omit<Customer, 'userId'>): Promise<Customer> {
        const customer = this.repository.create(customerData);
        return await this.repository.save(customer);
    }

    async findById(id: number): Promise<Customer | null> {
        return await this.repository.findOne({ where: { userId: id } });
    }

    async findAll(): Promise<Customer[]> {
        return await this.repository.find();
    }

    async save(customer: Customer): Promise<Customer> {
        return await this.repository.save(customer);
    }

    async saveMany(customers: Customer[]): Promise<Customer[]> {
        return await this.repository.save(customers);
    }
}