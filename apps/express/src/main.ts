/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'socket.io';
import { driverRoutes } from './app/drivers/driver.routes';
import { ServerEvents } from '@spa-nodejs/socket-events';
import { DriverEvent } from './app/drivers/driver-event';
import * as config from './../config.json';
import { UpdateIntervalResponse } from '@spa-nodejs/model';

const app = express();
const router = express.Router();
app.use(cors()); // enable CORS to allow requests from frontend

// register driver api routes.
router.use('/drivers', driverRoutes);

// Endpoint which returns data update interval.
router.get('/update-interval', (req, res) => {
  const response: UpdateIntervalResponse = {
    milliseconds: config.locationUpdateInterval,
  };
  res.send(response);
});

router.get('', (req, res) => {
  res.send({ message: 'Welcome to express!' });
});

// api base
app.use('/api', router);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

// Create socket server as well
const io = new Server<Record<string, unknown>, ServerEvents>(server, {
  cors: {
    origin: '*', // enable CORS to allow requests from frontend
  },
});

// Start driving (update location). Broadcast event when location is updated.
DriverEvent.init(io);
