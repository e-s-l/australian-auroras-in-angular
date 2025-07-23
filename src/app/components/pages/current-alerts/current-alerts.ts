import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertData } from '../../../services/alerts/alert-data';
import { AlertStateService } from '../../../services/alerts/alert-state';
import { Observable } from 'rxjs';


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
    private alertState: AlertStateService
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
    console.log(`clicked ${entry}`)
  }

}
