import { Driver } from '@spa-nodejs/model';
import * as fs from 'fs';
import * as config from './../../../config.json';
import * as path from 'path';

/**
 * Repository for driver. Read and writes driver data.
 */
export class DriverRepository {
  constructor() {
    this.ensureDirectoryExistence(config.dataPath);
  }
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

  private ensureDirectoryExistence(filePath: string) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    this.ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
  }
}
