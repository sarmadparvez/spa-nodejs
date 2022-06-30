/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as fs from 'fs';
// randopeep is for generating stuff that we can include in our fake data*
import * as randopeep from 'randopeep';
import { config } from 'dotenv';
import { Driver } from '@spa-nodejs/model';
config();

const app = express();
app.use(cors()); // enable CORS to allow requests from frontend

// register handler to return driver data
app.get('/api/drivers', function (req, res) {
  fs.readFile(process.env.DATA_PATH, 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express!' });
});

fs.writeFileSync(process.env.DATA_PATH, '[]');

//Generate 10 objects to work with in the backend for the front end

genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();
genobj();

function genobj() {
  const o = JSON.parse(fs.readFileSync(process.env.DATA_PATH, 'utf8'));
  const d = {
    driverName: randopeep.name(),
    driverCityOrigin: randopeep.address.city(),
    driverLanguage: ['de', 'en', 'nl', 'fr', 'es', 'ar'][
      Math.floor(Math.random() * 6)
    ],
    driverPhone: randopeep.address.phone(),
    driverGender: ['male', 'female'][Math.floor(Math.random() * 2)],
    driverInfo: randopeep.corporate.catchPhrase(),
    carMake: randopeep.corporate.name('large'),
    kmDriven: Math.floor(Math.random() * 100000),
    location: randopeep.address.geo(),
  };
  o.push(d);
  fs.writeFileSync(process.env.DATA_PATH, JSON.stringify(o));
}

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
