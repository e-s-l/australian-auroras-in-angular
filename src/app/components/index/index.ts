import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [ CommonModule ],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  @Input() name!: string;
  @Input() entry: any;

  openDetails() {
    console.log("details requested", this.entry);
  }

}
