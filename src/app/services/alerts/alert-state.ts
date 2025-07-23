import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertStateService {

  private hasAlertsSubject = new BehaviorSubject<boolean>(false);
  hasAlerts = this.hasAlertsSubject.asObservable();

  setAlerts(value: boolean) {
    this.hasAlertsSubject.next(value);
  }
}
