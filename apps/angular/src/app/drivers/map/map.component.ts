import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { MapService } from './map.service';
import { DriverStore } from '../driver-store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Driver } from '@spa-nodejs/model';

interface Marker {
  position: google.maps.LatLngLiteral;
  driver: Driver;
  icon: string;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div class="page-container">
      <p class="map-note">
        The drivers are shown with car icon on the map. Click on an icon to see
        the driver details. The data on the map is refreshed as per the set
        interval. When the icon info window is open, data updates are
        temporarily paused, and resumed when the window is closed.
      </p>
      <div *ngIf="mapService.loaded | async" class="map-container">
        <google-map height="80vh" width="90%" [zoom]="zoom" [center]="center">
          <map-marker
            #markerRef="mapMarker"
            *ngFor="let marker of markers | async"
            [position]="marker.position"
            [icon]="marker.icon"
            (mapClick)="openInfoWindow(markerRef, infoWindow, marker.driver)"
          >
          </map-marker>
          <map-info-window
            #infoWindow="mapInfoWindow"
            (closeclick)="closeInfoWindow()"
          >
            <ng-container *ngIf="iconInfoContent | async as driver">
              <h2>{{ driver.name }}</h2>
              <div><b>Car Make: </b>{{ driver.carMake }}</div>
              <div><b>Phone: </b>{{ driver.phone }}</div>
              <div><b>Km Driven: </b>{{ driver.kmDriven }}</div>
              <div><b>Language: </b>{{ driver.language }}</div>
              <div><b>Info: </b>{{ driver.info }}</div>
              <div><b>Gender: </b>{{ driver.gender }}</div>
              <div><b>City: </b>{{ driver.cityOrigin }}</div>
              <div><b>GPS Coordinates: </b>{{ driver.location }}</div>
            </ng-container>
          </map-info-window>
        </google-map>
      </div>
    </div>
  `,
  styles: [
    `
      .map-container {
        margin-left: 8%;
      }
      .map-note {
        margin-right: 45px;
      }
    `,
  ],
})
export class MapComponent implements OnDestroy {
  constructor(
    protected readonly mapService: MapService,
    private readonly driverStore: DriverStore
  ) {}

  readonly destroyed = new ReplaySubject<void>(1);
  readonly zoom = 1.15;
  readonly center: google.maps.LatLngLiteral = { lat: 19, lng: 12 };
  readonly pause = new BehaviorSubject<boolean>(false);
  iconInfoContent = new ReplaySubject<Driver>(1);

  markers: Observable<Marker[]> = combineLatest([
    this.mapService.loaded,
    this.driverStore.watchDrivers(),
  ]).pipe(
    switchMap(([loaded, drivers]) => {
      const markers: Marker[] = [];
      drivers.forEach((driver) => {
        markers.push({
          position: {
            lat: parseInt(driver.location[0]),
            lng: parseInt(driver.location[1]),
          },
          driver,
          icon: '../../../assets/map-icon.png',
        });
      });
      return of(markers);
    }),
    filter(() => !this.pause.value),
    takeUntil(this.destroyed),
    shareReplay(1)
  );

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, driver: Driver) {
    /** when icon is clicked, info window is opened. The window closes when the
     * data is updated because icon position is changed, and it is re-rendered.
     * For better user experience, pause the data updates until info window is opened.
     * */
    this.pause.next(true);
    this.iconInfoContent.next(driver);
    infoWindow.open(marker);
  }

  /**
   * When icon info window is closed, resume data updates.
   */
  closeInfoWindow() {
    this.pause.next(false);
  }

  ngOnDestroy() {
    this.destroyed.next();
  }
}
