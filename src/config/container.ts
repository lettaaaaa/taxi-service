
import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../dal/dataSource';

// DAL Repositories
import { 
    UserRepository, 
    DriverRepository, 
    CustomerRepository, 
    OrderRepository, 
    CarRepository, 
    RouteRepository, 
    ReviewRepository, 
    CsvReader 
} from '../dal/repositories';

// BLL Services
import { DataImportService } from '../bll/services/DataImportService';

// Interfaces (Contracts)
import { 
    IUserRepository, 
    IDriverRepository, 
    ICustomerRepository, 
    IOrderRepository, 
    ICarRepository, 
    IRouteRepository, 
    IReviewRepository, 
    ICsvReader 
} from '../dal/interfaces';
import { IDataImportService } from '../bll/interfaces/IDataImportService';

export async function configureDependencies(): Promise<void> {
  // 1. Ініціалізація підключення до бази даних (DataSource)
  if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('Database connection established');
  }

  // 2. Реєстрація самого об'єкта DataSource
  container.register<DataSource>(DataSource, {
    useValue: AppDataSource
  });

  // 3. Реєстрація DAL (Зв'язуємо інтерфейси з класами репозиторіїв)
  container.register<ICsvReader>('ICsvReader', { useClass: CsvReader });
  container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
  container.register<IDriverRepository>('IDriverRepository', { useClass: DriverRepository });
  container.register<ICustomerRepository>('ICustomerRepository', { useClass: CustomerRepository });
  container.register<IOrderRepository>('IOrderRepository', { useClass: OrderRepository });
  container.register<ICarRepository>('ICarRepository', { useClass: CarRepository });
  container.register<IRouteRepository>('IRouteRepository', { useClass: RouteRepository });
  container.register<IReviewRepository>('IReviewRepository', { useClass: ReviewRepository });

  // 4. Реєстрація BLL (Зв'язуємо сервіс імпорту) 
  container.register<IDataImportService>('IDataImportService', {
    useClass: DataImportService
  });

  console.log('Dependency injection container configured');
}

export { container };