import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { MapDisplayComponent } from '../../components/place-autocomplete/map-display.component';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { TravelSuggestionsComponent } from '../../components/travel-suggestions/travel-suggestions.component';



@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    NgIf,
    TravelSuggestionsComponent
  ],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent {

}
