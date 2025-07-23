import { Injectable } from '@angular/core';
import { Observable } from  "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { 
  KIndexResponse, 
  IndexResponse, 
  VALID_LOCATIONS 
} from '../../models/Indices';

import {
  MagAlertResponse,
  MagWarningResponse,
  AuroraAlertResponse,
  AuroraWatchResponse,
  AuroraOutlookResponse
} from '../../models/Alerts';


const httpOptions = {
  headers: new HttpHeaders (
    'Content-Type: application/json; charset=UTF-8'
  )
}

@Injectable({
  providedIn: 'root'
})
export class BomApiService {

    private apiUrl = environment.API_URL;
    private apiKey = environment.BOM_KEY;

    constructor(
      private http: HttpClient,
    ) { }

    /**
     * Utilities
     */

    private formatDate(dateIn?: string): string | undefined {
      /**
       * ought to implement some regex to check the date formatting too.
       * should be YYYY-mm-dd
       */
        return dateIn ? `${dateIn} 00:00:00` : undefined;
    }

    /** 
    *  Indices
    */

    getKIndex(start?: string, end?: string, location: string = 'Australian Region'): Observable<KIndexResponse> {

       let options: any = {};
  
      if (!VALID_LOCATIONS.includes(location)) {
        location = 'Australian region';
      }
      
      options.location = location;

      /**
       * here we lose information since k-index (uniquely)
       * can be specified at 3-hour intervals
       */

      if (this.formatDate(start)) options.start = this.formatDate(start);
      if (this.formatDate(end)) options.end = this.formatDate(end);

      const body = {
        api_key: this.apiKey,
        options: options,
      };

    return this.http.post<KIndexResponse>(`${this.apiUrl}get-k-index`, body, httpOptions);

  }

  getAIndex(start?: string, end?: string): Observable<IndexResponse> {

      let options: any = { location: 'Australian region' };
      if (this.formatDate(start)) options.start = this.formatDate(start);
      if (this.formatDate(end)) options.end = this.formatDate(end);

      const body = {
        api_key: this.apiKey,
        options: options,
      };

      return this.http.post<IndexResponse>(`${this.apiUrl}get-a-index`, 
        body, httpOptions);
  }

  getDstIndex(start?: string, end?: string): Observable<IndexResponse> {

      let options: any = { location: 'Australian region' };
      if (this.formatDate(start)) options.start = this.formatDate(start);
      if (this.formatDate(end)) options.end = this.formatDate(end);

      const body = {
        api_key: this.apiKey,
        options: options,
      };
    
      return this.http.post<IndexResponse>(`${this.apiUrl}get-dst-index`, 
        body, httpOptions);
  }

   /**
   * Alerts, Warnings & Outlooks
   */

  getMagAlerts(): Observable<MagAlertResponse> {
    const body = {
      api_key: this.apiKey,
    };

    return this.http.post<MagAlertResponse>(`${this.apiUrl}get-mag-alert`, body, httpOptions);
  }

  getMagWarnings(): Observable<MagWarningResponse> {
    const body = {
      api_key: this.apiKey,
    };

    return this.http.post<MagWarningResponse>(`${this.apiUrl}get-mag-warning`, body, httpOptions);
  }

  getAuroraAlerts(): Observable<AuroraAlertResponse> {
    const body = {
      api_key: this.apiKey,
    };

    return this.http.post<AuroraAlertResponse>(`${this.apiUrl}get-aurora-alert`, body, httpOptions);
  }

  getAuroraWatches(): Observable<AuroraWatchResponse> {
    const body = {
      api_key: this.apiKey,
    };

    return this.http.post<AuroraWatchResponse>(`${this.apiUrl}get-aurora-watch`, body, httpOptions);
  }

  getAuroraOutlooks(): Observable<AuroraOutlookResponse> {
    const body = {
      api_key: this.apiKey,
    };

    return this.http.post<AuroraOutlookResponse>(`${this.apiUrl}get-aurora-outlook`, body, httpOptions);
  }

}
