
import { Customer } from '../../domain/entities/Customer';

export interface ICustomerRepository {
    create(customer: Omit<Customer, 'customerId'>): Promise<Customer>;
    findById(id: number): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    save(customer: Customer): Promise<Customer>;
    saveMany(customers: Customer[]): Promise<Customer[]>;
}