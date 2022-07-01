import { DriverRepository } from './driver-repository';
import { Driver, Gender, Language } from '@spa-nodejs/model';
import * as randopeep from 'randopeep';
import * as config from '../../../config.json';

/**
 * Driver service generates driver data.
 */
export class DriverService {
  private static instance: DriverService;

  private readonly repository: DriverRepository;

  private constructor() {
    this.repository = new DriverRepository();
    this.init();
  }

  public static getInstance(): DriverService {
    if (!DriverService.instance) {
      DriverService.instance = new DriverService();
    }
    return DriverService.instance;
  }

  public get(): Promise<Driver[]> {
    return this.repository.get();
  }

  public async updateDriversLocation(): Promise<boolean> {
    const drivers = await this.repository.get();
    if (drivers.length === 0) {
      this.init();
    }
    const updatedDrivers = drivers.map((driver) => {
      driver.location = randopeep.address.geo();
      return driver;
    });
    try {
      await this.repository.saveDriversAsync(updatedDrivers);
      return true;
    } catch (err) {
      console.error(err);
    }
    return false;
  }

  private init(): void {
    const drivers = this.generateDrivers(config.driverCount);
    try {
      this.repository.saveDriversSync(drivers);
    } catch (err) {
      console.error(err);
    }
  }

  private generateDrivers(count: number): Driver[] {
    const drivers: Driver[] = [];
    for (let i = 0; i < count; i++) {
      drivers.push(this.generateDriver());
    }
    return drivers;
  }

  private generateDriver(): Driver {
    const driver: Driver = {
      name: randopeep.name(),
      cityOrigin: randopeep.address.city(),
      language: Object.values(Language)[Math.floor(Math.random() * 6)],
      phone: randopeep.address.phone(),
      gender: Object.values(Gender)[Math.floor(Math.random() * 2)],
      info: randopeep.corporate.catchPhrase(),
      carMake: randopeep.corporate.name('large'),
      kmDriven: Math.floor(Math.random() * 100000),
      location: randopeep.address.geo(),
    };
    return driver;
  }
}
