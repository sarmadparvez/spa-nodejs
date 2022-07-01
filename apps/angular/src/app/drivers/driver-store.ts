import { Driver } from '@spa-nodejs/model';
import { io, Socket } from 'socket.io-client';
import { EventResponse, ServerEvents } from '@spa-nodejs/socket-events';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Get Drivers from backend.
 * The use of REST Api and Sockets is demonstrated.
 * First call is made to REST Api.
 * Subsequent updates are handled by socket events.
 */

@Injectable({
  providedIn: 'root',
})
export class DriverStore {
  private getEndpoint = environment.apiBase + '/drivers';
  private readonly drivers = new ReplaySubject<Driver[]>(1);

  private readonly socket: Socket<ServerEvents, Record<string, unknown>>;

  constructor(private readonly http: HttpClient) {
    this.getDrivers();
    this.socket = io(environment.backend);
    this.handleEvents();
  }

  watchDrivers() {
    return this.drivers.asObservable();
  }

  private async getDrivers() {
    const drivers = await firstValueFrom(
      this.http.get<Driver[]>(environment.backend + this.getEndpoint)
    );
    this.drivers.next(drivers);
  }

  private handleEvents() {
    this.socket.on('drivers:update', (res: EventResponse<Driver>) =>
      this.driversUpdated(res.data)
    );
  }

  private driversUpdated(drivers: Driver[]) {
    console.log(drivers);
    this.drivers.next(drivers);
  }
}
