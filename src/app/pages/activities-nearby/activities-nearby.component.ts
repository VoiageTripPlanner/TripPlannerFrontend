import { Component } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';
import { ActivitiesNearbyCardComponent } from '../../components/activities-nearby-card/activities-nearby-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BudgetBarComponent } from '../../components/budget-bar/budget-bar.component';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-activities-nearby',
  standalone: true,
  imports: [
    NgIf,
    HttpClientTestingModule,
    MatToolbarModule,
    MatStepperModule,
    ActivitiesNearbyCardComponent,
    BudgetBarComponent,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
  ],
  templateUrl: './activities-nearby.component.html',
  styleUrl: './activities-nearby.component.scss'
})
export class ActivitiesNearbyComponent {

  constructor(private router: Router,) {
  }

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

    navigateToDashboard() {
      this.router.navigateByUrl('app/dashboard')
    }
  }
