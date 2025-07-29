import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modals/modal';

@Component({
  selector: 'app-index',
  imports: [ CommonModule ],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  @Input() name!: string;
  @Input() entry: any;
  @Input() notes!: string; 

  constructor(
    private modal: ModalService
  ) {}

  openDetails(entry: any) {

    this.modal.open({
      title: `${this.name} Index Details`,
      entry,
      notes: this.notes,
    });
  }

}
