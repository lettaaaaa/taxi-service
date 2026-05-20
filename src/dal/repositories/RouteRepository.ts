
import { injectable } from 'tsyringe';
import { Repository, DataSource } from 'typeorm';
import { Route } from '../../domain/entities/Route';
import { IRouteRepository } from '../interfaces/IRouteRepository';

@injectable()
export class RouteRepository implements IRouteRepository {
    private repository: Repository<Route>;

    constructor(private dataSource: DataSource) {
        this.repository = dataSource.getRepository(Route);
    }

    async create(routeData: Omit<Route, 'routeId'>): Promise<Route> {
    const route = this.repository.create(routeData);
        return await this.repository.save(route);
    }

    async findById(id: number): Promise<Route | null> {
        return await this.repository.findOne({ where: { routeId: id } });
    }

    async findAll(): Promise<Route[]> {
        return await this.repository.find();
    }

    async save(route: Route): Promise<Route> {
        return await this.repository.save(route);
    }

    async saveMany(routes: Route[]): Promise<Route[]> {
        return await this.repository.save(routes);
    }
}