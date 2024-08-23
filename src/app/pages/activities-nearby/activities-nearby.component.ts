import { Component, inject, ViewChild } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent } from '../../components/place-autocomplete/place-autocomplete.component';
import { ActivitiesNearbyCardComponent } from '../../components/activities-nearby-card/activities-nearby-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BudgetBarComponent } from '../../components/budget-bar/budget-bar.component';
import { Router } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { BudgetService } from '../../services/budged.service';
import { OpenAIService } from '../../services/openai.service';
import { FoodService } from '../../services/voiage-services/food.service';
import { TripService } from '../../services/voiage-services/trip.service';
import { NotifyService } from '../../shared/notify/notify.service';
import { IActivityEstimate, IAISuggestion } from '../../interfaces/openai.interface';
import { ActivityService } from '../../services/voiage-services/activity.service';
import { IActivity } from '../../interfaces/activities.interface';
import { ITripForm } from '../../interfaces/trip.interface';

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
    NgIf,
    ActivitiesNearbyCardComponent,
    HttpClientTestingModule
  ],
  templateUrl: './activities-nearby.component.html',
  styleUrl: './activities-nearby.component.scss'
})
export class ActivitiesNearbyComponent {

  budgetService         = inject(BudgetService);
  openAIService         = inject(OpenAIService);
  activitiesService     = inject(ActivityService);
  tripService           = inject(TripService);
  notifyService         = inject(NotifyService);

  activitiesPriceEstimate   : IAISuggestion;
  storedFormData            : ITripForm 


  constructor(
    private router: Router
  ) {
    this.activitiesPriceEstimate    = this.openAIService.onGetDefaultAISuggestion();
    this.storedFormData             = this.tripService.getFormData() ? this.tripService.getFormData() : this.tripService.onGetDefaultTripForm();
  }

  fromValue         : IPlaceSearchResult = { address: '' };
  toValue           : IPlaceSearchResult = { address: '' };
  fromNearbyPlaces  : IPlaceSearchResult[] = [];
  toNearbyPlaces    : IPlaceSearchResult[] = [];
  allNearbyPlaces   : IPlaceSearchResult[] = [];

  onNearbyPlacesFound(places: IPlaceSearchResult[]) {
    if (this.fromValue.address) {
      this.fromNearbyPlaces = places;
    }
    if (this.toValue.address) {
      this.toNearbyPlaces = places;
    }
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];

    }

    navigateToDashboard() {
      this.router.navigateByUrl('app/dashboard')
    }


    priceEstimation(){

      let storedActivitiesData: IActivity[]       = this.activitiesService.getActivities().length > 0 ? this.activitiesService.getActivities() : this.activitiesService.onGetDefaultVoiageActivitiesList();

      //hacer el filtro de actividades vacias 
      storedActivitiesData                                  = storedActivitiesData.filter(food => food.name !== '');
  
      this.activitiesPriceEstimate.startDate                = this.storedFormData.check_in_date;
      this.activitiesPriceEstimate.endDate                  = this.storedFormData.check_out_date;
      this.activitiesPriceEstimate.destination              = this.storedFormData.q;
      this.activitiesToEstimate(storedActivitiesData);
  
  
      this.openAIService.getPriceEstimate(this.activitiesPriceEstimate).subscribe({
        next: (response) => {
          
          const amount = response.totalEstimate
          const classification = 'activities';
  
          this.budgetService.updateSpending(amount, classification);
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.notifyService.onCustomErrorNotify('No price estimated', 'Could not estimate the price of the activities');
        },
        complete: () => {
          console.log('Request completed');
        }
      });

    };

    activitiesToEstimate( storedActivitiesData: IActivity[] ) {

      storedActivitiesData.forEach(restaurant => {
        
        let restaurantEstimate: IActivityEstimate = this.openAIService.onGetDefaultActivityEstimate();
  
        restaurantEstimate.name               = restaurant.name || '';
        restaurantEstimate.address            = restaurant.address || '';
        restaurantEstimate.location           = this.storedFormData.q  ?? '';
        restaurantEstimate.priceEstimate      = 0;
        this.activitiesPriceEstimate.activityEstimates.push(restaurantEstimate);
      });
  
    }

  }
