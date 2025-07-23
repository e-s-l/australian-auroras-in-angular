import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertData } from '../../../services/alerts/alert-data';
import { AlertStateService } from '../../../services/alerts/alert-state';
import { Observable } from 'rxjs';
import { ModalService } from '../../../services/modals/modal';


@Component({
  selector: 'app-current-alerts',
  imports: [ CommonModule ],
  templateUrl: './current-alerts.html',
  styleUrl: './current-alerts.css'
})
export class CurrentAlerts {

  hasAlerts!: Observable<boolean>;

  constructor(
    private alertData: AlertData,
    private alertState: AlertStateService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.alertData.loadAll();
    this.hasAlerts = this.alertState.hasAlerts;
  }

  get magAlerts() {return this.alertData.magAlerts}
  get auroraAlerts() {return this.alertData.auroraAlerts}

  get magWarnings() {return this.alertData.magWarnings}
  get auroraWatches() {return this.alertData.auroraWatches}
  get auroraOutlooks() {return this.alertData.auroraOutlooks}


  openDetails(entry: any) {
    this.modal.open({
      title: `Details`,
      entry,
      notes: 'This data was retrieved from the Bureau of Meteorology API.'
    });
  }

}
