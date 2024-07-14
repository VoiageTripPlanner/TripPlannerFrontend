import { Component } from '@angular/core';
import { LocationGMapsComponent } from '../../components/locationGMaps/locationGMaps.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LocationGMapsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  gMapsComponent: LocationGMapsComponent;
  
  constructor() {
    // Instantiate the Google Maps component
    this.gMapsComponent = new LocationGMapsComponent();
  }
}
