
import { injectable, inject } from 'tsyringe';
import { IDataImportService } from '../interfaces/IDataImportService';
import { ICsvReader } from '../../dal/interfaces/ICsvReader';
import { 
    ICustomerRepository, IDriverRepository, ICarRepository, 
    IOrderRepository, IRouteRepository, IReviewRepository 
} from '../../dal/interfaces';
import { Customer, Driver, Car, Order, Route, Review } from '../../domain/entities';

@injectable()
export class DataImportService implements IDataImportService {
  constructor(
    @inject('ICsvReader') private csvReader: ICsvReader,
    @inject('ICustomerRepository') private customerRepository: ICustomerRepository,
    @inject('IDriverRepository') private driverRepository: IDriverRepository,
    @inject('ICarRepository') private carRepository: ICarRepository,
    @inject('IOrderRepository') private orderRepository: IOrderRepository,
    @inject('IRouteRepository') private routeRepository: IRouteRepository,
    @inject('IReviewRepository') private reviewRepository: IReviewRepository
  ) {}

  // Метод для очищення через репозиторії
  async clearDatabase(): Promise<void> {
    console.log('Cleaning database tables...');
    const repos = [
      this.reviewRepository,
      this.orderRepository,
      this.routeRepository,
      this.driverRepository,
      this.customerRepository,
      this.carRepository
    ];

    for (const repo of repos) {
      try {
        // Використовуємо .repository.delete({}), щоб не залежати від методів інтерфейсу
        const actualRepo = (repo as any).repository || repo;
        await actualRepo.delete({});
      } catch (err) {
        console.warn(`Could not clear a table, skipping...`);
      }
    }
    console.log('Database cleared.');
  }

  async importTaxiData(filePath: string): Promise<void> {
    console.log('Reading CSV file...');
    const rows = await this.csvReader.readCsv(filePath);
    
    if (rows.length === 0) {
      console.log('No data found in CSV file');
      return;
    }

    const customersMap = new Map<string, Customer>();
    const driversMap = new Map<string, Driver>();
    const carsMap = new Map<string, Car>();
    const ordersData: any[] = [];

    console.log(`Processing ${rows.length} rows...`);

    for (const row of rows) {
      // 1. Клієнт
      if (!customersMap.has(row.custPhone)) {
        customersMap.set(row.custPhone, new Customer({
          firstName: row.custFirstName,
          lastName: row.custLastName,
          phoneNumber: row.custPhone,
          gender: row.custGender,
          totalTrips: Math.floor(Math.random() * 50) + 1,
          customerRating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
          favoriteAddresses: [row.startPoint]
        }));
      }

      // 2. Машина
      if (!carsMap.has(row.carPlate)) {
        carsMap.set(row.carPlate, new Car({
          model: row.carModel,
          plateNumber: row.carPlate,
          color: row.carColor,
          type: row.carType,
          isAvailable: Math.random() > 0.2
        }));
      }

      // 3. Водій
      if (!driversMap.has(row.driverLicense)) {
        const driver = new Driver({
          firstName: row.driverFirstName,
          lastName: row.driverLastName,
          phoneNumber: row.driverPhone,
          gender: row.driverGender,
          driverLicense: row.driverLicense,
          totalTrips: Math.floor(Math.random() * 100) + 10,
          driverRating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1))
        });

        const car = carsMap.get(row.carPlate);
        if (car) {
          driver.car = car;
        }

        driversMap.set(row.driverLicense, driver);
      }

      ordersData.push(row);
    }

    console.log('Saving unique Customers and Cars...');
    const savedCustomers = await this.customerRepository.saveMany(Array.from(customersMap.values()));
    const savedCars = await this.carRepository.saveMany(Array.from(carsMap.values()));

    const carPlateToEntity = new Map(savedCars.map(c => [c.plateNumber, c]));
    const driversToSave = Array.from(driversMap.values()).map(driver => {
      const plate = (driver as any).car?.plateNumber;
      if (plate && carPlateToEntity.has(plate)) {
        driver.car = carPlateToEntity.get(plate)!;
      }
      return driver;
    });

    console.log('Saving Drivers with Car relations...');
    const savedDrivers = await this.driverRepository.saveMany(driversToSave);

    const customerIdMap = new Map(savedCustomers.map(c => [c.phoneNumber, c]));
    const driverIdMap = new Map(savedDrivers.map(d => [d.driverLicense, d]));

    console.log('Creating Orders, Routes and Reviews...');
    for (const data of ordersData) {
      const route = await this.routeRepository.save(new Route({
        startPoint: data.startPoint,
        endPoint: data.endPoint,
        distance: parseFloat(data.distance)
      }));

      const order = new Order({
        status: data.orderStatus,
        totalPrice: parseFloat(data.totalPrice),
        createdAt: new Date(data.orderDate)
      });

      order.customer = customerIdMap.get(data.custPhone)!;
      order.driver = driverIdMap.get(data.driverLicense)!;
      order.route = route;

      const savedOrder = await this.orderRepository.save(order);

      await this.reviewRepository.save(new Review({
        rating: parseFloat(data.reviewRating),
        comment: data.reviewComment,
        createdAt: new Date(),
        order: savedOrder
      }));
    }

    console.log('Import completed successfully!');
  }
}