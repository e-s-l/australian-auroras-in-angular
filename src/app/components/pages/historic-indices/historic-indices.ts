import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexData } from '../../../services/indices/index-data';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-historic-indices',
  imports: [ FormsModule,
            PlotlyModule,
            CommonModule],
  templateUrl: './historic-indices.html',
  styleUrl: './historic-indices.css'
})
export class HistoricIndices {

  // form data passed in via ngModel
  startDate: string = '';
  endDate: string = '';

  showKIndex: boolean = true;
  showAIndex: boolean = true;
  showDstIndex: boolean = true;

  // data passed out to the plotly plot
  plotData: any[] = [];
  plotLayout: any = {};
  plotConfig = { responsive: true };

  constructor(private indexData: IndexData) {}

  loadHistoricData(): void {

    /**
     * FIXME
     * this is naive and needs to handle observables.
     * currently have to press load twice to get any data.
     */

    if (!this.startDate || !this.endDate) return;

    this.indexData.loadKIndexData(this.startDate, this.endDate),
    this.indexData.loadAIndexData(this.startDate, this.endDate),
    this.indexData.loadDstIndexData(this.startDate, this.endDate)

    this.updatePlot();
  }

  updatePlot() {

    const kData = this.indexData.kIndexEntries;
    const aData = this.indexData.aIndexEntries[0];
    const dstData = this.indexData.dstIndexEntries[0];

    this.plotData = [];

    if (this.showKIndex && kData.length) {
      this.plotData.push({
        x: kData.map(e => e.valid_time),
        y: kData.map(e => e.index),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
        name: 'K Index'
      });
    }

    if (this.showAIndex && aData.length) {
      this.plotData.push({
        x: aData.map(e => e.valid_time),
        y: aData.map(e => e.index),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        name: 'A Index'
      });
    }

    if (this.showDstIndex && dstData.length) {
      this.plotData.push({
        x: dstData.map(e => e.valid_time),
        y: dstData.map(e => e.index),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        name: 'Dst Index'
      });
    }

    this.plotLayout = {
      title: 'Index Data Over Time',
      xaxis: { title: 'Time' },
      yaxis: { title: 'Index Value' }
    };
  }


}
