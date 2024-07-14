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
  // Import the Google Maps component
  // Assuming the component is named GoogleMapsComponent
  // Replace 'GoogleMapsComponent' with the actual name of your component
  // Also, make sure to import the component at the top of this file
  // import { GoogleMapsComponent } from './path/to/google-maps.component';
  gMapsComponent: LocationGMapsComponent;
  
  constructor() {
    // Instantiate the Google Maps component
    this.gMapsComponent = new LocationGMapsComponent();
  }
}
