import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Service to load the map JavaScript Library to prevent loading it multiple times.
 */
@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly apiKey =
    'QUl6YVN5Q1F4YXgxYnRuQVdQamt5VVBxWVd5WjNEQkZuN3NCRF9n';
  private readonly apiLoaded = new ReplaySubject(1);
  readonly loaded = this.apiLoaded.asObservable();

  constructor(httpClient: HttpClient) {
    // Lazy load the map API
    httpClient
      .jsonp(
        `https://maps.googleapis.com/maps/api/js?key=${atob(this.apiKey)}`,
        'callback'
      )
      .subscribe(() => this.apiLoaded.next(true));
  }
}
