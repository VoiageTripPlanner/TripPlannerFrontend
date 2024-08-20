import { Component, inject, OnInit } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodCardComponent } from '../../components/food/food-card/food-card.component';
import { Router } from '@angular/router';
import { BudgetBarComponent } from '../../components/budget-bar/budget-bar.component';
import { MatStepperModule } from '@angular/material/stepper';
import { OpenAIService } from '../../services/openai.service';
import { BudgetService } from '../../services/budged.service';
import { IActivityEstimate, IAISuggestion } from '../../interfaces/openai.interface';
import { FoodService } from '../../services/voiage-services/food.service';
import { ActivityService } from '../../services/voiage-services/activity.service';
import { IVoiageRestaurant } from '../../interfaces/food.interface';
import { TripService } from '../../services/voiage-services/trip.service';
import { ITripForm } from '../../interfaces/trip.interface';
import { IActivity } from '../../interfaces/activities.interface';
import { NotifyService } from '../../shared/notify/notify.service';


@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    FoodCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    BudgetBarComponent,
  ],
  templateUrl: './food.component.html',
  styleUrl: './food.component.scss'
})
export class FoodComponent implements OnInit {

  budgetService         = inject(BudgetService);
  openAIService         = inject(OpenAIService);
  foodService           = inject(FoodService);
  activitiesService     = inject(ActivityService);
  tripService           = inject(TripService);
  notifyService         = inject(NotifyService);

  foodPriceEstimate         : IAISuggestion;
  activitiesPriceEstimate   : IAISuggestion;
  storedFormData            : ITripForm 

  constructor(
    private router: Router, 
  ){
    this.foodPriceEstimate          = this.openAIService.onGetDefaultAISuggestion();
    this.activitiesPriceEstimate    = this.openAIService.onGetDefaultAISuggestion();
    this.storedFormData             = this.tripService.getFormData() ? this.tripService.getFormData() : this.tripService.onGetDefaultTripForm();
  }
  ngOnInit(): void {
  }

  navigateToDashboard() {
    this.router.navigateByUrl('app/dashboard')
  }

  navigateToSummary() {

    this.restaurantPriceEstimate();

    this.router.navigateByUrl('/summary')
  }

  restaurantPriceEstimate() { 

    let storedFoodData: IVoiageRestaurant[]       = this.foodService.getFoodData().length > 0 ? this.foodService.getFoodData() : this.foodService.onGetDefaultVoiageRestaurantList();

    //hacer el filtro de actividades vacias 
    storedFoodData                                  = storedFoodData.filter(food => food.name !== '');

    this.foodPriceEstimate.startDate                = this.storedFormData.check_in_date;
    this.foodPriceEstimate.endDate                  = this.storedFormData.check_out_date;
    this.foodPriceEstimate.destination              = this.storedFormData.q;
    this.restaurantsToEstimate(storedFoodData);


    this.openAIService.getPriceEstimate(this.foodPriceEstimate).subscribe({
      next: (response) => {
        debugger
        const amount = response.totalEstimate
        const classification = 'food';

        this.budgetService.updateSpending(amount, classification);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.notifyService.onError();
      },
      complete: () => {
        console.log('Request completed');
      }
    });

  }; 



  restaurantsToEstimate( storedFoodData: IVoiageRestaurant[] ) {

    storedFoodData.forEach(restaurant => {
      
      let restaurantEstimate: IActivityEstimate = this.openAIService.onGetDefaultActivityEstimate();

      restaurantEstimate.name               = restaurant.name || '';
      restaurantEstimate.address            = restaurant.addressLocation || '';
      restaurantEstimate.location           = restaurant.locationCityCountry ?? '';
      restaurantEstimate.priceEstimate      = 0;
      this.foodPriceEstimate.activityEstimates.push(restaurantEstimate);
    });

  }


}
