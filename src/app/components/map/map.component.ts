import { LocationMarkService } from './../../services/location-mark.service';
import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule, MapDirectionsService, MapAdvancedMarker} from '@angular/google-maps';
import { BehaviorSubject, map } from 'rxjs';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { ILocation } from '../../interfaces/location.interface';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { I } from '@angular/cdk/keycodes';
import { IGoogleResponse } from '../../interfaces/google-hotel-response.interface';

import { environment } from '../../../environments/environment';

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
  map!: GoogleMap;
  
  isLoading: boolean = true;
  service = new LocationMarkService();
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  zoomToPlace$ = new BehaviorSubject<IPlaceSearchResult | undefined>(undefined);
  zoomToLodge$ = new BehaviorSubject<IGoogleResponse | undefined>(undefined);
  zoom: number = 8;

  address: string = '';
  placeId: string = '';
  latitude: number = 9.748917;
  longitude: number = -83.753428;

  loc: ILocation = {
    address: this.address,
    place_id: this.placeId,
    LatLng: {
      latitude: this.latitude,
      longitude: this.longitude
    }
  };

  center: google.maps.LatLngLiteral = {
    lat: this.latitude,
    lng: this.longitude
  }
  
  @Input()
  destination: any | undefined;

  @Input()
  zoomPlace : IPlaceSearchResult | undefined;

  @Input()
  zoomLodge : IGoogleResponse | undefined;

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
    if (this.destination?.location?.address) {
      const destinationLatLng: google.maps.LatLngLiteral = {
        lat: this.destination?.location?.LatLng?.latitude || 0,
        lng: this.destination?.location?.LatLng?.longitude || 0
      };
      this.gotoLocation(destinationLatLng);
    }
  }

  ngOnChanges() {
    const zoomPlace: google.maps.LatLngLiteral = {
      lat: this.zoomPlace?.location?.LatLng?.latitude || 0,
      lng: this.zoomPlace?.location?.LatLng?.longitude || 0
    };
    if (zoomPlace) {
      this.gotoLocationZoom(zoomPlace);
    }

    const zoomLodge = this.zoomLodge?.gps_coordinates;
    if (zoomLodge) {
      const latLng = new google.maps.LatLng(zoomLodge.latitude, zoomLodge.longitude);
      this.gotoLodgeZoom(latLng);
    }

    const destinationZooom: google.maps.LatLngLiteral = {
      lat: this.zoomPlace?.location?.LatLng?.latitude || 0,
      lng: this.zoomPlace?.location?.LatLng?.longitude || 0
    };
    if (destinationZooom) {
      this.gotoLocation(destinationZooom);
    }

    this.destination= undefined;
    this.zoomPlace = undefined;

  }

  gotoLocation(location: google.maps.LatLngLiteral) {
      this.markerPositions = [location];
      this.map.panTo(location);
      this.zoom = 10;
      this.directionsResult$.next(undefined);
  }
  
  gotoLocationZoom(location: google.maps.LatLngLiteral) {
      this.markerPositions = [location];
      this.map.panTo(location);
      this.zoom = 25;
      this.directionsResult$.next(undefined);
  }

  gotoLodgeZoom(location: google.maps.LatLng) {
    this.markerPositions = [location.toJSON()];
    this.map.panTo(location.toJSON());
    this.zoom = 25;
    this.directionsResult$.next(undefined);
  }

  getDirections(
    fromLocation: google.maps.LatLng,
    toLocation: google.maps.LatLng
  ) {
    const request: google.maps.DirectionsRequest = {
      destination: toLocation,
      origin: fromLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(map((response) => response.result))
      .subscribe((res) => {
        this.directionsResult$.next(res);
        this.markerPositions = [];
      });
  }

  zoomToPlace(place: IPlaceSearchResult) {
    const loc = place.location?.LatLng;
    if (place.location && place.location.LatLng && loc?.latitude && loc?.longitude) {
      const latLng: google.maps.LatLngLiteral = {
        lat: loc.latitude,
        lng: loc.longitude
      };
      this.gotoLocation(latLng);
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
                place_id: this.placeId,
                LatLng:{
                  latitude: this.latitude,
                  longitude: this.longitude,
                },
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

