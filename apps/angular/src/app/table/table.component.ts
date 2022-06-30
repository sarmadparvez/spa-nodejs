import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>table works!</p> `,
  styles: [``],
})
export class TableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
