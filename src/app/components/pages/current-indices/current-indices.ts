import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Index } from '../../index';
import { IndexData } from '../../../services/indices/index-data';

@Component({
  selector: 'app-current-indices',
  imports: [Index, CommonModule],
  templateUrl: './current-indices.html',
  styleUrl: './current-indices.css'
})
export class CurrentIndices {

  constructor(public indexData: IndexData) {}

  ngOnInit(): void {
    this.indexData.loadAll();
  }

  get kIndexEntries() { return this.indexData.kIndexEntries; }
  get aIndexEntries() { return this.indexData.aIndexEntries; }
  get dstIndexEntries() { return this.indexData.dstIndexEntries; }

}
