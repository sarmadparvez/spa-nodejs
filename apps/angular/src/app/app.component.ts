import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <!--Title-->
      <h1>{{ title }}</h1>

      <!--Navigation items-->
      <div class="toolbar__navigation">
        <a mat-button [routerLink]="''"> Table </a>
        <a mat-button [routerLink]="'/map'"> Map </a>
        <a mat-button [routerLink]="'/json'"> JSON </a>
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
      [value]="10"
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
    `,
  ],
})
export class AppComponent {
  readonly title = 'Web App';
}
