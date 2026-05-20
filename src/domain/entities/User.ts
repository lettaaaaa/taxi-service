
import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm';

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    gender: string;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}