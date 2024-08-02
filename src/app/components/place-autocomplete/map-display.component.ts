import { Component, Input, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  GoogleMapsModule,
  MapDirectionsService,
} from '@angular/google-maps';
import { BehaviorSubject, map } from 'rxjs';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, RouterOutlet, LoaderComponent],
  template: `
    <google-map #map [zoom]="zoom" width="100%" height="100%">
      <map-directions-renderer
        *ngIf="directionsResult$ | async as directionResults"
        [directions]="directionResults"
      ></map-directions-renderer>
      <map-marker
        *ngFor="let markerPosition of markerPositions"
        [position]="markerPosition"
      >
      </map-marker>
      <map-marker
        *ngFor="let place of pointsOfInterest"
        [position]="place.location!"
        [title]="place.name!"
        [label]="place.name!"
      >
      </map-marker>
    </google-map>
  `,
  styles: [``],
})
export class MapDisplayComponent implements OnInit, OnChanges {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  from: IPlaceSearchResult | undefined;

  @Input()
  to: IPlaceSearchResult | undefined;

  @Input()
  pointsOfInterest: IPlaceSearchResult[] = [];

  markerPositions: google.maps.LatLng[] = [];

  zoomToPlace$ = new BehaviorSubject<IPlaceSearchResult | undefined>(undefined);

  zoom = 5;

  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation) {
      this.gotoLocation(fromLocation);
    } else if (toLocation) {
      this.gotoLocation(toLocation);
    }
  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 10;
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

}
