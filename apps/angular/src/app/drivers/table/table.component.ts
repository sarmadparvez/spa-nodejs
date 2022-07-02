import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverStore } from '../driver-store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Driver } from '@spa-nodejs/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  template: `
    <div class="page-container">
      <h1>Drivers</h1>
      <p class="table-note">
        The data (GPS coordinates column) is refreshed as per the set interval.
        You can also sort the data in the table by clicking on the column header
        by name, gender or km driven columns.
      </p>
      <table
        mat-table
        [dataSource]="dataSource"
        class="mat-elevation-z8"
        matSort
      >
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <!-- Gender Column -->
        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Gender</th>
          <td mat-cell *matCellDef="let element">
            {{ element.gender }}
          </td>
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
          <th mat-header-cell *matHeaderCellDef mat-sort-header>KM Driven</th>
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
        pageSize="10"
        [pageSizeOptions]="[10, 20, 50, 100]"
        showFirstLastButtons="true"
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
      .table-note {
        margin-right: 45px;
      }
    `,
  ],
})
export class TableComponent implements AfterViewInit, OnDestroy {
  constructor(private readonly driverStore: DriverStore) {
    this.subscriptions.add(
      this.driverStore.watchDrivers().subscribe((drivers) => {
        this.dataSource.data = drivers;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
