import { Driver } from '@spa-nodejs/model';
import { io, Socket } from 'socket.io-client';
import { EventResponse, ServerEvents } from '@spa-nodejs/socket-events';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
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
  constructor(private readonly http: HttpClient) {
    this.fetchDrivers();
    this.socket = io(environment.backend);
    this.handleEvents();
  }

  private getEndpoint = `${environment.apiBase}/drivers`;
  private readonly drivers = new ReplaySubject<Driver[]>(1);
  private readonly driversUpdateEvent = new Subject<void>();
  private readonly socket: Socket<ServerEvents, Record<string, unknown>>;

  watchDrivers(): Observable<Driver[]> {
    return this.drivers.asObservable();
  }

  watchDriversUpdate(): Observable<void> {
    return this.driversUpdateEvent.asObservable();
  }

  private async fetchDrivers(): Promise<void> {
    const drivers = await firstValueFrom(
      this.http.get<Driver[]>(`${environment.backend}${this.getEndpoint}`)
    );
    this.drivers.next(drivers);
  }

  private handleEvents(): void {
    this.socket.on('drivers:update', (res: EventResponse<Driver>) =>
      this.driversUpdated(res.data)
    );
  }

  private driversUpdated(drivers: Driver[]): void {
    this.drivers.next(drivers);
    this.driversUpdateEvent.next();
  }
}
