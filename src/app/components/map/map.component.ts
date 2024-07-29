import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [LoaderComponent,RouterOutlet, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  // isLoading: boolean = false;
  isLoading: boolean = true;

  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  onMapReady() {
    this.isLoading = false;
  }


}

