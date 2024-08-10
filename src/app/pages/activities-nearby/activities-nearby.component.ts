import { Component } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { ActivitiesNearbyCardComponent } from '../../components/activities-nearby-card/activities-nearby-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-activities-nearby',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
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
    // Logic to update nearby places based on which field is being updated
    if (this.fromValue.address) {
      this.fromNearbyPlaces = places;
    }
    if (this.toValue.address) {
      this.toNearbyPlaces = places;
    }

    // Merge all places to display in the map
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];

    }
  }
