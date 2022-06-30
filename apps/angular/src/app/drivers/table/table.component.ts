import { Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverStore } from '../driver-store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Driver } from '@spa-nodejs/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  template: `
    <div class="page-container">
      <h1>Drivers</h1>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <!-- Gender Column -->
        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef>Gender</th>
          <td mat-cell *matCellDef="let element">{{ element.gender }}</td>
        </ng-container>

        <!-- City Origin Column -->
        <ng-container matColumnDef="cityOrigin">
          <th mat-header-cell *matHeaderCellDef>City</th>
          <td mat-cell *matCellDef="let element">{{ element.cityOrigin }}</td>
        </ng-container>

        <!-- Language Column -->
        <ng-container matColumnDef="language">
          <th mat-header-cell *matHeaderCellDef>Language</th>
          <td mat-cell *matCellDef="let element">{{ element.language }}</td>
        </ng-container>

        <!-- phone Column -->
        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef>Phone</th>
          <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
        </ng-container>

        <!-- Info Column -->
        <ng-container matColumnDef="info">
          <th mat-header-cell *matHeaderCellDef>Info</th>
          <td mat-cell *matCellDef="let element">{{ element.info }}</td>
        </ng-container>

        <!-- carMake Column -->
        <ng-container matColumnDef="carMake">
          <th mat-header-cell *matHeaderCellDef>Car Make</th>
          <td mat-cell *matCellDef="let element">{{ element.carMake }}</td>
        </ng-container>

        <!-- kmDriven Column -->
        <ng-container matColumnDef="kmDriven">
          <th mat-header-cell *matHeaderCellDef>KM Driven</th>
          <td mat-cell *matCellDef="let element">{{ element.kmDriven }}</td>
        </ng-container>

        <!-- Location Column -->
        <ng-container matColumnDef="location">
          <th mat-header-cell *matHeaderCellDef>GPS coordinates</th>
          <td mat-cell *matCellDef="let element">{{ element.location }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        class="mat-elevation-z8"
        [pageSizeOptions]="[10, 25, 50, 100]"
        showFirstLastButtons="true"
        length="20"
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class TableComponent implements OnDestroy {
  constructor(private readonly driverStore: DriverStore) {
    this.subscriptions.add(
      this.driverStore.watchDrivers().subscribe((drivers) => {
        this.dataSource.data = drivers;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  readonly dataSource: MatTableDataSource<Driver> =
    new MatTableDataSource<Driver>();
  readonly subscriptions = new Subscription();
  readonly displayedColumns = [
    'name',
    'gender',
    'cityOrigin',
    'language',
    'phone',
    'info',
    'carMake',
    'kmDriven',
    'location',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
