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
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, RouterOutlet, LoaderComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges  {

  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  destination: IPlaceSearchResult | undefined;

  @Input()
  zoomPlace : IPlaceSearchResult | undefined;

  @Input()
  pointsOfInterest: IPlaceSearchResult[] = [];

  markerPositions: google.maps.LatLng[] = [];

  zoomToPlace$ = new BehaviorSubject<IPlaceSearchResult | undefined>(undefined); //

  zoom = 5;

  //Asignar un valor inicial a la variable directionsResult$ de tipo BehaviorSubject
  
  directionsResult$ = new BehaviorSubject< 
    google.maps.DirectionsResult | undefined
  >(undefined);

  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit(): void {

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


}

