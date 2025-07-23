import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { IndexData } from './services/indices/index-data';
import { AlertData } from './services/alerts/alert-data';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'AusSpaceWeather';

  constructor(
    private indexData: IndexData,
    private alertsData: AlertData
  ) {}

  ngOnInit(): void {
    this.indexData.loadAll();
    this.alertsData.loadAll();
  }
}
