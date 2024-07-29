import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { RouterOutlet } from '@angular/router';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { BehaviorSubject, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges {
  
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  from: IPlaceSearchResult | undefined;

  @Input()
  to: IPlaceSearchResult | undefined;

  @Input()
  pointsOfInterest: IPlaceSearchResult[] = [];

  markerPositions: google.maps.LatLng[] = [];

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
    this.zoom = 17;
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
}}
