import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { TableComponent } from './table/table.component';
import { JSONComponent } from './json/json.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'json',
    component: JSONComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
