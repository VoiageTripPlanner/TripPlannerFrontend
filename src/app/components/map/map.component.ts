import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule, MapDirectionsService, MapAdvancedMarker} from '@angular/google-maps';
import { BehaviorSubject, map } from 'rxjs';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { ILocation } from './../../interfaces/location.interface';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { MapLocationService } from '../../services/map-location.service';
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

  isLoading: boolean = true;
  service = new MapLocationService();
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  zoomToPlace$ = new BehaviorSubject<IPlaceSearchResult | undefined>(undefined);
  zoom: number = 8;

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
  
  @Input()
  destination: IPlaceSearchResult | undefined;

  @Input()
  zoomPlace : IPlaceSearchResult | undefined;

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
    if (this.destination?.location) {
      this.gotoLocation(this.destination.location);
    }
  }

  ngOnChanges() {
    const zoomPlace = this.zoomPlace?.location;
    if (zoomPlace) {
      this.gotoLocationZoom(zoomPlace);
    }

    const destinationZooom = this.destination?.location;
    if (destinationZooom) {
      this.gotoLocation(destinationZooom);
    }

    this.destination= undefined;
    this.zoomPlace = undefined;

  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 10;
    this.directionsResult$.next(undefined);
  }

  gotoLocationZoom(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
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
    if (place.location) {
      this.gotoLocation(place.location);
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

