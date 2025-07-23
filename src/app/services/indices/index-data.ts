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
          console.log('k-index data:', this.kIndexEntries);
        }
      },
      error: err => {
        console.error('HTTP error:', err);
      }
    });

    this.kIndexEntries.forEach(entry => {
      console.log(entry);
      // entry.expires = `${entry.valid_time} + 3 hours`;
    });

  }

  loadAIndexData(start: string = '', end: string = ''): void {
    this.bomService.getAIndex(start, end).subscribe({
      next: (response: IndexResponse) => {
        if (response.errors) {
          console.error('API errors:', response.errors);
        } else {
          this.aIndexEntries = response.data;
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
          console.log('dst index data:', this.dstIndexEntries);
        }
      },
      error: err => {
        console.error('HTTP error:', err);
      }
    });
  }




}
