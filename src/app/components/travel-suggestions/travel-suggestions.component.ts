import { Component, effect, inject } from '@angular/core';
import { PlaceAutocompleteComponent } from '../place-autocomplete/place-autocomplete.component';
import { MapComponent } from '../map/map.component';
import { LoaderComponent } from '../loader/loader.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IOpenAIResponse, IPlaceSearchResult } from '../../interfaces/placeSearch';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-travel-suggestions',
  standalone: true,
  imports: [
    PlaceAutocompleteComponent,    
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './travel-suggestions.component.html',
  styleUrl: './travel-suggestions.component.scss'
})
export class TravelSuggestionsComponent {

  fromValue: IPlaceSearchResult = { address: '' };
  public GoogleService: GoogleService = inject(GoogleService);
  public travelSuggestions!: IOpenAIResponse;

  constructor() {
  }

  getTravelSuggestions() {
    const datos : IPlaceSearchResult = {
      address: this.fromValue.address
    };

    this.GoogleService.getPlaceSuggestions(datos.address);

    effect(() => {
      this.travelSuggestions = this.GoogleService.suggestionsResponseSignal$();
      console.log(this.travelSuggestions);
    });

  }


 // fromNearbyPlaces: IPlaceSearchResult[] = [];
 // toNearbyPlaces: IPlaceSearchResult[] = [];
  //allNearbyPlaces: IPlaceSearchResult[] = [];

  onNearbyPlacesFound(places: IPlaceSearchResult[]) {
    // Logic to update nearby places based on which field is being updated
  //  if (this.fromValue.address) {
   //   this.fromNearbyPlaces = places;
   // }
    // Merge all places to| display in the map
   // this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];
  }

}