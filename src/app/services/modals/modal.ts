import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalContent {
  title?: string;
  entry?: any;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private contentSubject = new BehaviorSubject<ModalContent | null>(null);

  isOpen = this.isOpenSubject.asObservable();
  content = this.contentSubject.asObservable();

  open(content: ModalContent) {
    this.contentSubject.next(content);
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
    this.contentSubject.next(null);
  }
}
