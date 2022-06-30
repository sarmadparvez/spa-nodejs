/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'socket.io';
import { driverRoutes } from './app/drivers/driver-controller';
import { ServerEvents } from '@spa-nodejs/socket-events';
import { DriverEvent } from './app/drivers/driver-event';

const app = express();
app.use(cors()); // enable CORS to allow requests from frontend

// register driver api routes
app.use('/api/drivers', driverRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express!' });
});

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
