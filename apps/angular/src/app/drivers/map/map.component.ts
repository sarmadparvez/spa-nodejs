import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div class="page-container">
      <div *ngIf="mapService.loaded | async">
        <google-map></google-map>
      </div>
    </div>
  `,
  styles: [``],
})
export class MapComponent implements OnInit {
  constructor(protected readonly mapService: MapService) {}

  ngOnInit(): void {}
}
