import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UpdateIntervalResponse } from '@spa-nodejs/model';
import { firstValueFrom, ReplaySubject } from 'rxjs';

/**
 * This service is responsible for fetching configurations from backend.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly updateIntervalSubject = new ReplaySubject<number>(1);
  readonly updateInterval = this.updateIntervalSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.fetchUpdateInterval();
  }

  async fetchUpdateInterval(): Promise<void> {
    const response = await firstValueFrom(
      this.http.get<UpdateIntervalResponse>(
        `${environment.backend}${environment.apiBase}/update-interval`
      )
    );
    this.updateIntervalSubject.next(response.milliseconds);
  }
}
