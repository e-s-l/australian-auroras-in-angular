import { Component, Input } from '@angular/core';
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


  openDetails(entry: any, notes: string = '') {

    this.modal.open({
      title: 'Details',
      entry,
      notes,
    });
  }

  magWarningNotes = 'Magnetic Alerts provide notification of a geomagnetic disturbance where the Australian regional K index (a three hour index) is greater than 5.';

  auroraWatchNotes = 'Aurora watches are warnings with lead times of up to 48 hours. They will only be issued in response to a significant solar Coronal Mass Ejection (CME) or coronal hole likely to be geo-effective. Aurora alerts will follow if favourable space weather activity actually occurs.';

  auroraOutlookNotes = 'Aurora outlooks are warnings with lead times of 3-7 days. They will be issued in response to the presence of a large active solar region expected to rotate into a position that is favourable for CMEs, and similarly for significant coronal holes.\nAurora watches and/or alerts will follow if a geoeffective CME is observed and/or significant geomagnetic activity actually occurs.';

  auroraAlertNotes = 'Aurora Alerts provide notification of times when auroras are more likely to be seen at more equatorial latitudes than is normal. Because the likelihood of seeing an aurora depends greatly on location, the local time, and the sky conditions, the Alerts should be considered only as an indication that space weather conditions are (or are expected to be) favourable for aurora sightings.';

  magAlertNotes = 'Magnetic Alerts provide notification of a geomagnetic disturbance where the Australian regional K index (a three hour index) is greater than 5.';

}
