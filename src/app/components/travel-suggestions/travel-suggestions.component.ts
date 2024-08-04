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
import { IActivity } from '../../interfaces/activities.interface';

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

  fromValue: IActivity = { address: '' };
  public GoogleService: GoogleService = inject(GoogleService);
  public travelSuggestions!: IOpenAIResponse;



  constructor() {
    this.getTravelSuggestions();
  }

  getTravelSuggestions() {
    if (!this.fromValue.address) {
      this.GoogleService.suggestionsResponseSignal$();  
    }
      
    const datos : IActivity = {
      address: this.fromValue.address
    };

    this.GoogleService.getPlaceSuggestions(datos.address);

    effect(() => {
      this.travelSuggestions = this.GoogleService.suggestionsResponseSignal$();
      console.log(this.travelSuggestions);
    });

  }

}