import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { MapComponent } from '../../components/map/map.component';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { TravelSuggestionsComponent } from '../../components/travel-suggestions/travel-suggestions.component';



@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapComponent,
    NgIf,
    TravelSuggestionsComponent
  ],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent {

}
