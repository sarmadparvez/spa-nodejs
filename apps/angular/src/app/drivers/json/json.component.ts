import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverStore } from '../driver-store';
import { Observable } from 'rxjs';
import { Driver } from '@spa-nodejs/model';

@Component({
  selector: 'app-json',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>Drivers</h1>
      <p>The data (GPS coordinates) is refreshed as per the set interval.</p>
      <pre>{{ driverData | async | json }}</pre>
    </div>
  `,
  styles: [``],
})
export class JSONComponent {
  driverData: Observable<Driver[]>;

  constructor(private readonly driverStore: DriverStore) {
    this.driverData = this.driverStore.watchDrivers();
  }
}
