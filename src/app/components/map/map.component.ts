import { Component, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapAdvancedMarker } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  map!: google.maps.Map;
  latitude: number = 0;
  longitude: number = 0;
  coordinates: string = this.latitude + ',' + this.longitude;
  placeId: string = '';
  address: string = '';

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
    }
    this.placeId = (event as any).placeId;
    this.address = (event as any).address;
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
  }

  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  aLocations: any[] = [
    { lat: 0, lng: 0 },
  ];
  bLocations: any[] = [
    { lat: 0, lng: 0 },
  ];


}
