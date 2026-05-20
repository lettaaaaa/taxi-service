
import { Route } from '../../domain/entities/Route';

export interface IRouteRepository {
    create(route: Omit<Route, 'routeId'>): Promise<Route>;
    findById(id: number): Promise<Route | null>;
    findAll(): Promise<Route[]>;
    save(route: Route): Promise<Route>;
    saveMany(routes: Route[]): Promise<Route[]>;
}