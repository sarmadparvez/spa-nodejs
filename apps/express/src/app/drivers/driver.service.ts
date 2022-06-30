import { DriverRepository } from './driver-repository';
import { Driver, Gender, Language } from '@spa-nodejs/model';
import * as randopeep from 'randopeep';
import * as config from '../../../config.json';

export class DriverService {
  repository: DriverRepository;

  constructor() {
    this.repository = new DriverRepository();
    this.init();
  }

  public get(): Promise<Driver[]> {
    return this.repository.get();
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
