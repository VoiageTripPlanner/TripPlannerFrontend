import { Component, inject } from '@angular/core';
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
export class FoodComponent {

  budgetService         = inject(BudgetService);
  openAIService         = inject(OpenAIService);
  foodService           = inject(FoodService);
  activitiesService     = inject(ActivityService);
  tripService           = inject(TripService);

  foodPriceEstimate         : IAISuggestion;
  activitiesPriceEstimate   : IAISuggestion;

  constructor(
    private router: Router, 
  ){
    this.foodPriceEstimate     = this.openAIService.onGetDefaultAISuggestion();
    this.activitiesPriceEstimate    = this.openAIService.onGetDefaultAISuggestion();
  }

  navigateToDashboard() {
    this.router.navigateByUrl('app/dashboard')
  }

  navigateToSummary() {
    this.router.navigateByUrl('/summary')
  }

  restaurantPriceEstimate() { 

    const storedFoodData: IVoiageRestaurant[]       = this.foodService.getFoodData().length > 0 ? this.foodService.getFoodData() : this.foodService.onGetDefaultVoiageRestaurantList();



    const storedFormData: ITripForm                 = this.tripService.getFormData() ? this.tripService.getFormData() : this.tripService.onGetDefaultTripForm();


    this.foodPriceEstimate.startDate                = storedFormData.check_in_date;
    this.foodPriceEstimate.endDate                  = storedFormData.check_out_date;
    this.foodPriceEstimate.destination              = storedFormData.q;
    this.foodPriceEstimate.activityEstimates        = storedActivityData
  }; 



  activitiesToEstimate(){

    const storedActivityData: IActivity[]               = this.activitiesService.getActivities().length > 0 ? this.activitiesService.getActivities() : this.activitiesService.onGetDefaultVoiageActivitiesList();


    storedActivityData.forEach(activity => {
      let activityEstimate: IActivityEstimate = this.openAIService.onGetDefaultActivityEstimate();
      activityEstimate.name = activity.name || '';
      activityEstimate.address = activity.address;
      activityEstimate.location = activity.location ?? '';
      activityEstimate.priceEstimate = 0;
      ativitiesToBeEstimated.push(activityEstimate);
    });

  }

}
