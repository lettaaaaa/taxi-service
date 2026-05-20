
import { User } from '../../domain/entities/User';

export interface IUserRepository {
    create(user: Omit<User, 'userId'>): Promise<User>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<User>;
    saveMany(users: User[]): Promise<User[]>;
}