/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';

import { driverRoutes } from './app/drivers/driver-controller';

const app = express();
app.use(cors()); // enable CORS to allow requests from frontend

// register driver api routes
app.use('/api/drivers', driverRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express!' });
});

// Here we generate data for the api that can be used in the front end
setTimeout(function () {
  //var o = JSON.parse(fs.readFileSync('./cars/index.get.json', 'utf8'));
  //TODO: Move object location random every 5 seconds
  //fs.writeFile("./cars/index.get.json",
  //    JSON.stringify(o));
}, 5000);

// function cf() {fs.writeFile("./index.get.json", '[]');}

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
