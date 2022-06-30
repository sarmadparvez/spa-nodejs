import { Server } from 'socket.io';
import { EventResponse, ServerEvents } from '@spa-nodejs/socket-events';
import { DriverService } from './driver.service';
import { Driver } from '@spa-nodejs/model';
import * as config from '../../../config.json';

/**
 * Drive the cars i.e, update the location as per configured interval and broadcast event
 * to all connected  clients.
 */
export class DriverEvent {
  private static io: Server<Record<string, unknown>, ServerEvents>;
  private static readonly driverService = DriverService.getInstance();

  public static init(io: Server<Record<string, unknown>, ServerEvents>) {
    DriverEvent.io = io;
    DriverEvent.drive();
  }

  private static async drive(): Promise<void> {
    await DriverEvent.driverService.updateDriversLocation();
    await DriverEvent.broadcast();
    setTimeout(() => {
      DriverEvent.drive();
    }, config.locationUpdateInterval);
  }

  private static async broadcast(): Promise<void> {
    const drivers = await DriverEvent.driverService.get();
    DriverEvent.io.sockets.emit('drivers:update', <EventResponse<Driver>>{
      data: drivers,
    });
  }
}
