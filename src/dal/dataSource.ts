
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User, Driver, Customer, Car, Order, Route, Review } from "../domain/entities";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Driver, Customer, Car, Order, Route, Review],
    migrations: [],
    subscribers: [],
});