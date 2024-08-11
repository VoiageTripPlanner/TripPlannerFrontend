import { Component } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { ActivitiesNearbyCardComponent } from '../../components/activities-nearby-card/activities-nearby-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-activities-nearby',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    NgIf,
    ActivitiesNearbyCardComponent,
    HttpClientTestingModule
  ],
  templateUrl: './activities-nearby.component.html',
  styleUrl: './activities-nearby.component.scss'
})
export class ActivitiesNearbyComponent {

  fromValue: IPlaceSearchResult = { address: '' };
  toValue: IPlaceSearchResult = { address: '' };
  fromNearbyPlaces: IPlaceSearchResult[] = [];
  toNearbyPlaces: IPlaceSearchResult[] = [];
  allNearbyPlaces: IPlaceSearchResult[] = [];

  onNearbyPlacesFound(places: IPlaceSearchResult[]) {
    if (this.fromValue.address) {
      this.fromNearbyPlaces = places;
    }
    if (this.toValue.address) {
      this.toNearbyPlaces = places;
    }
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];

    }
  }
