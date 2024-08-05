import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { CommonModule, NgIf } from '@angular/common';
import { IGoogleResponse } from '../../interfaces/google-hotel-response.interface';
import { MapComponent } from '../map/map.component';
import { PlaceAutocompleteComponent } from '../place-autocomplete/place-autocomplete.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlaceCardComponent } from '../place-autocomplete/place-card.componet';
import { NotifyService } from '../../shared/notify/notify.service';
import { BudgetService } from '../../services/budged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities-nearby-card',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    NgIf,
    ActivitiesNearbyCardComponent,
    MapComponent],
  templateUrl: './activities-nearby-card.component.html',
  styleUrl: './activities-nearby-card.component.scss'
})
export class ActivitiesNearbyCardComponent implements OnInit {

  @Input() places: IPlaceSearchResult[] = [];
  @Output() onPlaceSelected = new EventEmitter<IPlaceSearchResult>();
  notifyService = inject(NotifyService);
  budgetService = inject(BudgetService);
  
  tripFormService: any;
  inputField: any;

  constructor(
    private router: Router,
  ) {
    
  }

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
  zoomToPlace: IPlaceSearchResult = { address: '' };

  onNearbyPlacesFound(places: IPlaceSearchResult[]) {
    if (this.fromValue.address) {
      this.fromNearbyPlaces = places;

    }
    if (this.toValue.address) {
      this.toNearbyPlaces = places;
    }
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];
    }

  viewInMap(place: IPlaceSearchResult) {

      this.zoomToPlace = place; 
    }

  visitSite(url: string | undefined): void {
      if (url) {
        window.open(url, '_blank');
      } else {
        this.notifyService.onNoData();
        }
  };

    
  selectOption(amount: number) {
      if (!amount) {
       amount = 0;
        } 
    const classification = 'food';
    this.budgetService.updateSpending(amount, classification);
    this.router.navigateByUrl('/app/dashboard');
    //Esto temporalmente mientras se completan demas componentes y borrar bien el local storage cuando se salga 
     localStorage.removeItem('budget');
     localStorage.removeItem('tripFormData');
  }
}
