import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { MapDisplayComponent } from '../../components/place-autocomplete/map-display.component';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';



@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    NgIf,
  ],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent {

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
    // Merge all places to display in the map
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];
  }

}
