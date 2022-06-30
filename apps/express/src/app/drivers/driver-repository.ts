import { Driver } from '@spa-nodejs/model';
import * as fs from 'fs';
import * as config from './../../../config.json';

export class DriverRepository {
  public async get(): Promise<Driver[]> {
    const data = await fs.promises.readFile(config.dataPath, 'utf8');
    try {
      return JSON.parse(data) as Driver[];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public saveDriversSync(drivers: Driver[]): void {
    fs.writeFileSync(config.dataPath, '[]');
    fs.writeFileSync(config.dataPath, JSON.stringify(drivers));
  }

  public async saveDriversAsync(drivers: Driver[]): Promise<void> {
    await fs.promises.writeFile(config.dataPath, '[]');
    await fs.promises.writeFile(config.dataPath, JSON.stringify(drivers));
  }
}
