import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./table/table.component').then((m) => m.TableComponent),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./map/map.component').then((m) => m.MapComponent),
  },
  {
    path: 'json',
    loadComponent: () =>
      import('./json/json.component').then((m) => m.JSONComponent),
  },
];
