
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('routes')
export class Route {
    @PrimaryGeneratedColumn()
    routeId: number;

    @Column()
    startPoint: string;

    @Column()
    endPoint: string;

    @Column('float')
    distance: number;

    constructor(data: Partial<Route>) {
        Object.assign(this, data);
    }
}