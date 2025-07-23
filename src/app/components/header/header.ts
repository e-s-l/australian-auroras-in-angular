import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertStateService } from '../../services/alerts/alert-state';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})

export class Header implements OnInit {
  hasWarnings = false;
  hasAlerts = false;

  title: string = 'Space Weather, AU';

  constructor(private alertState: AlertStateService) {}

  ngOnInit(): void {

    this.alertState.hasAlerts.subscribe(value => {
      this.hasAlerts = value;
    });
  }
}
