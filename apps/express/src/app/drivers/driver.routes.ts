/* Driver Endpoints */

import * as express from 'express';
import { DriverService } from './driver.service';
export const driverRoutes = express.Router();

const driverService = DriverService.getInstance();

driverRoutes.get('', async (req, res) => {
  const drivers = await driverService.get();
  res.send(drivers);
});
