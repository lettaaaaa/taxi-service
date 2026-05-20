import * as fs from 'fs';
import * as path from 'path';

class CsvGenerator {
  private readonly firstNames = ['Oleksandr', 'Mariia', 'Ivan', 'Anna', 'Dmytro', 'Olena', 'Serhii', 'Yuliia', 'Andrii', 'Nataliia', 'Viktor', 'Svitlana', 'Mykola', 'Iryna', 'Pavlo', 'Oksana', 'Volodymyr', 'Kateryna', 'Yevhen', 'Alina'];
  private readonly lastNames = ['Kovalenko', 'Melnyk', 'Shevchenko', 'Bondarenko', 'Tkachenko', 'Kravchenko', 'Oliinyk', 'Polishchuk', 'Boyko', 'Khmelyov', 'Marchenko', 'Dovzhenko', 'Fedorov', 'Hrytsenko', 'Zaitsev', 'Sokolova', 'Lysenko', 'Goncharenko', 'Kushnir'];
  
  private readonly carModels = ['Toyota Camry', 'Hyundai Sonata', 'Volkswagen Passat', 'Skoda Octavia', 'Tesla Model 3', 'BMW 5 Series', 'Ford Fusion', 'Renault Megane', 'Nissan Altima', 'Kia Optima', 'Mazda 6', 'Audi A4', 'Mercedes-Benz C-Class', 'Honda Accord', 'Subaru Legacy'];
  private readonly carTypes = ['Sedan', 'Hatchback', 'SUV', 'Luxury'];
  private readonly colors = ['White', 'Black', 'Silver', 'Dark Blue', 'Grey', 'Red', 'Green', 'Yellow', 'Brown', 'Orange'];
  
  private readonly cities = ['Lviv', 'Kyiv', 'Odesa', 'Dnipro', 'Kharkiv', 'Vinnytsia', 'Ivano-Frankivsk', 'Ternopil', 'Rivne', 'Chernivtsi', 'Zaporizhzhia', 'Lutsk', 'Uzhhorod', 'Kherson', 'Mykolaiv'];
  private readonly streetNames = ['Shevchenka St', 'Franka St', 'Bandery St', 'Horodotska St', 'Naukova St', 'Stryiska St', 'Vasylkivska St', 'Pekarska St', 'Kulparkivska St', 'Zelena St', 'Chornovola Ave', 'Lychakivska St', 'Sichovykh Striltsiv St', 'Khmelnitskoho St', 'Valova St'];
  
  private readonly statuses = ['COMPLETED', 'CANCELLED', 'IN_PROGRESS', 'SCHEDULED', 'FAILED', 'PENDING', 'REJECTED', 'ACCEPTED'];
  private readonly reviewComments = ['Great trip!', 'Driver was late', 'Very clean car', 'Smooth ride', 'Polite driver', 'Bad smell in cabin', 'Excellent service', 'Not recommended', 'Will ride again', 'Driver was rude', 'Car was uncomfortable', 'Amazing experience', 'Could be better', 'Highly recommend', 'Terrible service'];
  private readonly genders = ['male', 'female', 'other', 'prefer not to say'];

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generatePhone(): string {
    // Ukrainian phone format [cite: 20]
    return `+380${this.random(63, 99)}${this.random(1000000, 9999999)}`;
  }

  private generateAddress(): string {
    return `${this.randomElement(this.cities)}, ${this.randomElement(this.streetNames)}, ${this.random(1, 150)}`;
  }

  private generatePlate(): string {
    const regions = ['BC', 'AA', 'BH', 'AE', 'BK', 'AO', 'BI', 'AP', 'BT', 'AX', 'BA', 'BE', 'BO', 'AB', 'BB', 'BM', 'AT', 'AM'];
    const suffixes = ['AA', 'BB', 'CX', 'HT', 'II'];
    return `${this.randomElement(regions)} ${this.random(1000, 9999)} ${this.randomElement(suffixes)}`;
  }

  public generate(rowCount: number, outputPath: string): void {
    console.log(`Generating taxi data CSV (${rowCount} rows)...`);

    const headers = [
      'custFirstName', 'custLastName', 'custPhone', 'custGender', 
      'driverFirstName', 'driverLastName', 'driverPhone', 'driverLicense', 'driverGender',
      'carModel', 'carPlate', 'carColor', 'carType', 'carAvailable', // Додав доступність
      'startPoint', 'endPoint', 'distance', 
      'orderStatus', 'totalPrice', 'orderDate', 
      'reviewRating', 'reviewComment'
    ];

    let csvContent = headers.join(',') + '\n';

    for (let i = 0; i < rowCount; i++) {
      // Вибираємо одне місто для конкретної поїздки
      const tripCity = this.randomElement(this.cities);

      const row = [
        // Customer
        this.randomElement(this.firstNames),
        this.randomElement(this.lastNames),
        this.generatePhone(),
        this.randomElement(this.genders),
        
        // Driver
        this.randomElement(this.firstNames),
        this.randomElement(this.lastNames),
        this.generatePhone(),
        `DL${this.random(100000, 999999)}`,
        this.randomElement(this.genders),
        
        // Car
        this.randomElement(this.carModels),
        `${this.generatePlate()}-${i}`, 
        this.randomElement(this.colors),
        this.randomElement(this.carTypes),
        Math.random() > 0.2 ? 'true' : 'false', // 80% доступні
        
        `${tripCity}, ${this.randomElement(this.streetNames)}, ${this.random(1, 150)}`,
        `${tripCity}, ${this.randomElement(this.streetNames)}, ${this.random(1, 150)}`,
        (Math.random() * 15 + 1).toFixed(2), // Менша дистанція для міста
        
        // Order
        this.randomElement(this.statuses),
        (Math.random() * 100 + 10).toFixed(2),
        new Date(2026, this.random(0, 2), this.random(1, 28)).toISOString().split('T')[0],
        
        // Review
        this.random(1, 5).toString(),
        this.randomElement(this.reviewComments)
      ];

      csvContent += row.map(field => `"${field}"`).join(',') + '\n';
    }

    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, csvContent, 'utf-8');
    
    console.log(`File generated successfully: ${outputPath}`);
    console.log(`Total rows: ${rowCount}`);
  }
}

const generator = new CsvGenerator();
const rowCount = 1000;
const outputPath = path.join(process.cwd(), 'data', 'taxi_data.csv');

generator.generate(rowCount, outputPath);