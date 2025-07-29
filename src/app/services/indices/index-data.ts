import { Injectable } from '@angular/core';
import { BomApiService } from '../api/bom';

import {
  KIndexResponse,
  IndexResponse,
  KIndexEntry,
  IndexEntry } from '../../models/Indices';

@Injectable({
  providedIn: 'root'
})
export class IndexData {
  
  kIndexEntries: KIndexEntry[] = [];
  aIndexEntries: IndexEntry[][] = [];
  dstIndexEntries: IndexEntry[][] = [];

  /**
   * default parameters for immediate data requests
   */
  today: string = new Date().toISOString().slice(0, 10);
  defaultLocation: string = 'Australian Region';

  constructor(
    private bomService: BomApiService
  ) {}

  loadAll(): void {
    this.loadKIndexData();
    this.loadAIndexData();
    this.loadDstIndexData();
  }

  loadKIndexData(start: string = '', end: string = '', 
    location: string = this.defaultLocation): void {
    this.bomService.getKIndex(start, end, location).subscribe({
      next: (response: KIndexResponse) => {
        if (response.errors) {
          console.error('API errors:', response.errors);
        } else {
          this.kIndexEntries = response.data;
          
              this.kIndexEntries.forEach(entry => {
                entry.expires = this.calculateExpiry(entry.valid_time, 3);
              });

          console.log('k-index data:', this.kIndexEntries);
        }
      },
      error: err => {
        console.error('HTTP error:', err);
      }
    });
  }

  loadAIndexData(start: string = '', end: string = ''): void {
    this.bomService.getAIndex(start, end).subscribe({
      next: (response: IndexResponse) => {
        if (response.errors) {
          console.error('API errors:', response.errors);
        } else {
          this.aIndexEntries = response.data;


          this.aIndexEntries[0].forEach(entry => {
              entry.expires = this.calculateExpiry(entry.valid_time, 24);
          });

          console.log('a-index data:', this.aIndexEntries);
        }
      },
      error: err => {
        console.error('HTTP error:', err);
      }
    });

  }

  loadDstIndexData(start: string = '', end: string = ''): void {
    this.bomService.getDstIndex(start, end).subscribe({
      next: (response: IndexResponse) => {
        if (response.errors) {
          console.error('API errors:', response.errors);
        } else {
          console.log(`dst - raw response: ${response}`)
          this.dstIndexEntries = response.data;
          
          this.dstIndexEntries[0].forEach(entry => {
              entry.expires = this.calculateExpiry(entry.valid_time, 0);
          });
          
          console.log('dst index data:', this.dstIndexEntries);
        }
      },
      error: err => {
        console.error('HTTP error:', err);
      }
    });
  }

  calculateExpiry(dateTime: String, hours: number) {
      if (!dateTime) return '';

      // Convert "YYYY-MM-DD HH:mm:ss" to "YYYY-MM-DDTHH:mm:ss" (ISO 8601)
      const isoString = dateTime.replace(' ', 'T');

      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date string: ${dateTime}`);
        return '';
      }

    date.setHours(date.getHours() + hours);

   // return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;

    return date.toISOString();
  }

}
