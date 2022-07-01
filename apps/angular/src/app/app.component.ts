import { Component, OnDestroy } from '@angular/core';
import { ConfigService } from './config.service';
import { combineLatest, Subscription } from 'rxjs';
import { DriverStore } from './drivers/driver-store';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <!--Title-->
      <h1>{{ title }}</h1>

      <!--Navigation items-->
      <div class="toolbar__navigation">
        <a
          mat-button
          [routerLink]="''"
          routerLinkActive="active-link"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Table
        </a>
        <a mat-button [routerLink]="'/map'" routerLinkActive="active-link">
          Map
        </a>
        <a mat-button [routerLink]="'/json'" routerLinkActive="active-link">
          JSON
        </a>
      </div>

      <span class="spacer"></span>

      <!--Account details-->
      <span>Sarmad Parvez</span>
      <mat-icon class="toolbar__account">account_circle</mat-icon>
    </mat-toolbar>

    <mat-progress-spinner
      class="progress-spinner"
      color="primary"
      mode="determinate"
      diameter="50"
      [value]="progress"
    >
    </mat-progress-spinner>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .toolbar__navigation {
        margin-left: 50px;
      }
      .toolbar__account {
        margin-left: 10px;
      }
      .progress-spinner {
        position: absolute;
        right: 2%;
        top: 90px;
      }
      .active-link {
        color: black;
        background-color: floralwhite;
      }
    `,
  ],
})
export class AppComponent implements OnDestroy {
  readonly subscriptions = new Subscription();
  constructor(
    private readonly configService: ConfigService,
    private readonly driverStore: DriverStore
  ) {
    // When the update interval is fetched, and the drivers are updated
    // calculate the spinner progress
    this.subscriptions.add(
      combineLatest([
        this.configService.updateInterval,
        this.driverStore.watchDriversUpdate(),
      ]).subscribe(([interval, updated]) => {
        this.progress = 0;
        const startTime = new Date().getTime();
        const endTime = startTime + interval;
        this.calculateProgress(startTime, endTime);
      })
    );
  }

  readonly title = 'Web App';
  progress = 0;

  calculateProgress(startTime: number, endTime: number) {
    const now = new Date().getTime();
    const timePassed = now - startTime;
    const totalTime = endTime - startTime;
    const percentage = Math.ceil((timePassed / totalTime) * 100);

    // add adjustment of 5% to compensate for the time wasted in progress calculation.
    this.progress = percentage + 5;

    if (now < endTime && this.progress < 100) {
      setTimeout(() => {
        this.calculateProgress(startTime, endTime);
      }, 100);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
