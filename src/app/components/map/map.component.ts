import { ILocation } from './../../interfaces/location.interface';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker, MapDirectionsService } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { BehaviorSubject, map } from 'rxjs';
import { MapLocationService } from '../../services/map-location.service';

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
  @ViewChild('map', { static: true })

  isLoading: boolean = true;
  service = new MapLocationService();
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  address: string = '';
  placeId: string = '';
  latitude: number = 9.748917;
  longitude: number = -83.753428;

  loc: ILocation = {
    address: this.address,
    placeId: this.placeId,
    latitude: this.latitude,
    longitude: this.longitude
  };

  center: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude
  }
  zoom: number = 8;

  @Input()
  from: IPlaceSearchResult | undefined;

  @Input()
  pointsOfInterest: IPlaceSearchResult[] = [];

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  constructor(private directionsService: MapDirectionsService){  }

  ngOnInit(): void {
    if (!this.isValidApiKey()) {
      throw new Error('Invalid API Key');
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = (event.latLng.toJSON());
    }
  }

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
              const geocode = results[0];

              this.address = geocode.formatted_address;
              this.placeId = geocode.place_id;
              this.latitude = geocode.geometry.location.lat();
              this.longitude = geocode.geometry.location.lng();

              this.loc = {
                address: this.address,
                placeId: this.placeId,
                latitude: this.latitude,
                longitude: this.longitude
              };

            } else {
              throw new Error("No results found");
            }
          } else {
            throw new Error("Geocoder failed due to: " + status);
          }
        });
      }  
    }

    saveLocation() {
      this.service.saveLocation(this.loc)
    }
}

