import { Component, Input, OnInit } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ITripForm } from '../../interfaces/trip.interface';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { LoaderComponent } from '../loader/loader.component';
import { IGoogleResponse } from '../../interfaces/google-hotel-response.interface';
import { MapDisplayComponent } from '../place-autocomplete/map-display.component';
import { MapComponent } from '../map/map.component';
import { PlaceAutocompleteComponent } from '../place-autocomplete/place-autocomplete.component';

@Component({
  selector: 'app-activities-nearby-card',
  standalone: true,
  imports: [
    MapComponent,
    CommonModule, 
    MatCardModule, 
    FormsModule, 
    ModalComponent, 
    LoaderComponent,
    MapDisplayComponent,
    PlaceAutocompleteComponent],
  templateUrl: './activities-nearby-card.component.html',
  styleUrl: './activities-nearby-card.component.scss'
})
export class ActivitiesNearbyCardComponent implements OnInit {

  @Input() places: IPlaceSearchResult[] = [];
  tripFormService: any;

  trackByIndex(index: number, places: IGoogleResponse): number {
    return index;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  }

  ngOnInit(): void {}

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
