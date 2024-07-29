import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { MapDisplayComponent } from '../../components/place-autocomplete/map-display.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { ActivitiesNearbyCardComponent } from '../../components/activities-nearby-card/activities-nearby-card.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-activities-nearby',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    ActivitiesNearbyCardComponent,
    MapDisplayComponent,
    NgIf,
    MapComponent
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
