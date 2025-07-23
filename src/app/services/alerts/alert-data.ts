import { Injectable } from '@angular/core';
import { AlertStateService } from './alert-state';
import { BomApiService } from '../api/bom';
import {
  MagAlertEntry,
  MagWarningEntry,
  AuroraAlertEntry,
  AuroraWatchEntry,
  AuroraOutlookEntry,
  MagAlertResponse,
  MagWarningResponse,
  AuroraAlertResponse,
  AuroraWatchResponse,
  AuroraOutlookResponse
} from '../../models/Alerts';

@Injectable({
  providedIn: 'root'
})
export class AlertData {
  
    constructor(
      private bomService: BomApiService,
      private alertState: AlertStateService
    ) { }


    magAlerts: MagAlertEntry[] = [];
    auroraAlerts: AuroraAlertEntry[] = [];

    magWarnings: MagWarningEntry[] = [];
    auroraWatches: AuroraWatchEntry[] = [];
    auroraOutlooks: AuroraOutlookEntry[] = [];

    hasAlerts: boolean = false;

    loadAll(): void {
      this.loadMagAlerts();
      this.loadMagWarnings();
      this.loadAuroraAlerts();
      this.loadAuroraWatches();
      this.loadAuroraOutlooks();
    }

    updateAlertFlag(): void {

      let flagState =
        this.auroraAlerts.length > 0 ||
        this.magAlerts.length > 0 ||
        this.magWarnings.length > 0 ||
        this.auroraWatches.length > 0 ||
        this.auroraOutlooks.length > 0;

      this.hasAlerts = flagState;
      this.alertState.setAlerts(flagState);
    }



    loadMagAlerts(): void {
      this.bomService.getMagAlerts().subscribe({
        next: (response: MagAlertResponse) => {
          if (response.errors) {
            console.error('MagAlert API errors:', response.errors);
          } else {
            this.magAlerts = response.data;
            this.updateAlertFlag();
            console.log('MagAlerts:', this.magAlerts);
          }
        },
        error: err => {
          console.error('HTTP error (MagAlert):', err);
        }
      });
    }


    loadAuroraAlerts(): void {
      this.bomService.getAuroraAlerts().subscribe({
        next: (response: AuroraAlertResponse) => {
          if (response.errors) {
            console.error('AuroraAlert API errors:', response.errors);
          } else {
            this.auroraAlerts = response.data;
            this.updateAlertFlag();
            console.log('AuroraAlerts:', this.auroraAlerts);
          }
        },
        error: err => {
          console.error('HTTP error (AuroraAlert):', err);
        }
      });
    }

      loadMagWarnings(): void {
        this.bomService.getMagWarnings().subscribe({
          next: (response: MagWarningResponse) => {
            if (response.errors) {
              console.error('MagWarning API errors:', response.errors);
            } else {
              this.magWarnings = response.data;
              this.updateAlertFlag();
              console.log('MagWarnings:', this.magWarnings);
            }
          },
          error: err => {
            console.error('HTTP error (MagWarning):', err);
          }
        });
      }
    
      loadAuroraWatches(): void {
        this.bomService.getAuroraWatches().subscribe({
          next: (response: AuroraWatchResponse) => {
            if (response.errors) {
              console.error('AuroraWatch API errors:', response.errors);
            } else {
              this.auroraWatches = response.data;
              this.updateAlertFlag();
              console.log('AuroraWatches:', this.auroraWatches);
            }
          },
          error: err => {
            console.error('HTTP error (AuroraWatch):', err);
          }
        });
      }
    
      loadAuroraOutlooks(): void {
        this.bomService.getAuroraOutlooks().subscribe({
          next: (response: AuroraOutlookResponse) => {
            if (response.errors) {
              console.error('AuroraOutlook API errors:', response.errors);
            } else {
              this.auroraOutlooks = response.data;
              this.updateAlertFlag();
              console.log('AuroraOutlooks:', this.auroraOutlooks);
            }
          },
          error: err => {
            console.error('HTTP error (AuroraOutlook):', err);
          }
        });
      }

}
