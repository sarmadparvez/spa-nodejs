# Angular Express Application

This application shows real-time data for driver locations. Random drivers are generated whose
location is updated as per the set interval.

This project is a monorepo, and it contains two applications which are explained below.

##Angular
The frontend application shows visualizations of the real-time driver data i.e., in Table, Google Map, and JSON. The application is developed with Angular v14 and is available
in `apps/angular` directory. Overall this application demonstrates the following:

<ul>
  <li>Frontend development with Angular</li>
  <li>Reactive Programming (RxJs)</li>
  <li>Realtime data updates on user interface</li>
  <li>Consumption of REST API(s)</li>
  <li>Usage of socket client</li>
  <li>Usage of Angular Material components</li>
  <li>Standalone Angular Components</li>
  <li>Google Maps integration</li>
</ul>

##Express
The backend application generates random driver data. The driver [model](https://github.com/sarmadparvez/spa-nodejs/blob/main/libs/model/src/lib/driver.ts) is available
in the shared library which is used by both backend and frontend. The driver location is
randomly updated as per the set interval in [config.json](https://github.com/sarmadparvez/spa-nodejs/blob/main/apps/express/config.json) file.

The application exposes REST API to get driver data and also creates a
socket server to broadcast event to all connected clients whenever data is updated. Overall this application demonstrates the following:

<ul>
  <li>Backend development with Express using TypeScript</li>
  <li>Design and development of REST API(s)</li>
  <li>Socket server implementation</li>
  <li>Object-oriented programming and usage of design patterns</li>
  <li>Application architecture design</li>
</ul>

## Running the Applications

This project was generated using [Nx](https://nx.dev). As a pre-requisite to run and build the applications in this monorepo you will need to install Nx cli
`npm install -g nx`

### Development Server

Before running the individual applications on the development server run `npm install`
to install the dependencies. As it is a monorepo and there is just one `package.json` , it will install the dependencies for all
applications.

#### Angular

Run `nx serve angular` for a dev server on port 4200. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Express

Run `nx serve express` for a dev server on port 3333. The app will automatically reload if you change any of the source files.

The following REST API(s) are available:

1. Drivers Endpoint: GET http://localhost:3333/api/drivers
2. Update Interval: GET http://localhost:3333/api/update-interval (this is used by the frontend to show progress spinner).

## Building the Applications

Run `nx build angular` to build the angular project.

Run `nx build express` to build the angular project. Use the `--prod` flag for a production build.

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `nx test angular` to execute the unit tests for angular app.

Run `nx test express` to execute the unit tests for express app.

The unit tests are executed via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Understand the workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
