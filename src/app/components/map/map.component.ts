import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  
  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };
}
