import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>json works!</p> `,
  styles: [``],
})
export class JSONComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
