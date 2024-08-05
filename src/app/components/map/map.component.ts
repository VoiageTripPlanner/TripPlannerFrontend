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
  from: IPlaceSearchResult | undefined;

  @Input()
  to: IPlaceSearchResult | undefined;

  @Input()
  zoomPlace : IPlaceSearchResult | undefined;

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

  ngOnChanges() { // This method is called when the component is initialized and whenever the input properties change.
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;
    const zoomPlace = this.zoomPlace?.location;

    if (fromLocation && toLocation && zoomPlace) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation && !toLocation && !zoomPlace) {
      this.gotoLocation(fromLocation);
    } else if (toLocation && !fromLocation && !zoomPlace) {
      this.gotoLocation(toLocation);
    }else if (zoomPlace) {
      this.gotoLocationZoom(zoomPlace);
    }

    //Clear the directions if the from or to location is changed
    if (fromLocation || toLocation) {
      this.from = undefined;
      this.to = undefined;
      this.zoomPlace = undefined;
    }
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
    this.zoom = 20;
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

