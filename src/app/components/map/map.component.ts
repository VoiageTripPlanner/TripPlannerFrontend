import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [LoaderComponent,
            CommonModule,
            RouterOutlet, 
            GoogleMapsModule,
            MapAdvancedMarker,
],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    if (!this.isValidApiKey()) {
      throw new Error('Invalid API Key');
    }else{
      console.log('Valid');
    }
  }
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  latitude: number = 9.748917;
  longitude: number = -83.753428;
  coordinates: { lat: number, lng: number } = {
    lat: this.latitude ?? 0,
    lng: this.longitude ?? 0
  };
  center: google.maps.LatLngLiteral = this.coordinates;
  zoom: number = 8;
  display: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude
  };

  //Default coordinates for the map
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = (event.latLng.toJSON());
    }
  }
  //Update the display property with the new coordinates
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }

  isLoading: boolean = true;
  onMapReady() {
    this.isLoading = false;
  }

  isValidApiKey(): boolean {
    if(environment.maps_key) {
      this.isLoading = false;
      return true;
    }else {
      this.isLoading = true;
      return false;
    }
  }

  addOneMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      if (this.markerPositions.length === 1) {
        this.markerPositions.pop();
      }
      this.markerPositions.push(event.latLng.toJSON());
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === "OK") {
          if (results && results[0]) {
            console.log(results[0]);
            // Store the geocode object in a variable or use it as needed
          } else {
            console.log("No results found");
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      });
    }
  }
}






