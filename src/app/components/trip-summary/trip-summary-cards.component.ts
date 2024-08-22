import { Component, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budged.service';
import { NotifyService } from '../../shared/notify/notify.service';
import { TripService } from '../../services/voiage-services/trip.service';
import { LodgeService } from '../../services/voiage-services/lodge.service';
import { LocationMarkService } from '../../services/location-mark.service';
import { ITripForm } from '../../interfaces/trip.interface';
import { IBudgetPrices } from '../../interfaces/budget.interface';
import { IVoiageFlight } from '../../interfaces/flights.interface';
import { IVoiageLodge } from '../../interfaces/lodge.interface';
import { IVoiageRestaurant } from '../../interfaces/food.interface';
import { Router } from '@angular/router';
import { FlightService } from '../../services/voiage-services/flights.service';
import { FoodService } from '../../services/voiage-services/food.service';
import { ActivityService } from '../../services/voiage-services/activity.service';
import { IActivity } from '../../interfaces/activities.interface';
import { TravelSuggestionsComponent } from '../travel-suggestions/travel-suggestions.component';

@Component({
  selector: 'app-trip-summary-cards',
  standalone: true,
  imports: [
    TravelSuggestionsComponent
  ],
  templateUrl: './trip-summary-cards.component.html',
  styleUrl: './trip-summary-cards.component.scss'
})
export class TripSummaryCardsComponent implements OnInit {

  budgetService       = inject (BudgetService);
  notifyService       = inject (NotifyService);
  tripFormService     = inject (TripService);
  flightService       = inject (FlightService);
  lodgeService        = inject (LodgeService);
  foodService         = inject (FoodService);
  locationMark        = inject (LocationMarkService);
  activitiesService   = inject (ActivityService);
  

  initialForm               : ITripForm | undefined;
  tripBudget                : IBudgetPrices | undefined;
  flightSelected            : IVoiageFlight | undefined;
  lodgeSelected             : IVoiageLodge | undefined;
  foodSelectedlist          : IVoiageRestaurant[] | undefined;
  activitiesSelectedList    : IActivity[] | undefined;

  isLoading           : boolean = false;
  listArray           : string[]= [];
  restaurantCount     : number = 0;
  activitiesCount     : number = 0;
  dataAvailable       : boolean = false;


  constructor(
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.initializaData();

    this.onListAmenities();
  }

  private initializaData(){
    try {
      this.initialForm              = this.tripFormService.getFormData();
      this.tripBudget               = this.budgetService.getBudgetData();
  
      //Data seleccionada por el usuario
      this.flightSelected           = this.flightService.getFlightData();
      this.lodgeSelected            = this.lodgeService.getLodgeData();
      this.foodSelectedlist         = this.foodService.getFoodData();
      this.foodSelectedlist         = this.foodSelectedlist.filter(food => food.name !== '');
      this.activitiesSelectedList   = this.activitiesService.getActivities();
      this.activitiesSelectedList   = this.activitiesSelectedList.filter(activity => activity.address !== '');

      this.dataAvailable = !!(this.initialForm && this.tripBudget && this.flightSelected && this.lodgeSelected && this.foodSelectedlist.length);

      if (this.dataAvailable) {
        
        this.onListAmenities();

        this.restaurantCount    = this.foodSelectedlist.length;
        this.activitiesCount    = this.activitiesSelectedList.length;
      } else {
        throw new Error('Please complete the initial form');
      }
      
      this.activitiesCount    = this.activitiesSelectedList.length;
      this.restaurantCount=this.foodSelectedlist.length; 
      
    } catch (error) {
      this.router.navigateByUrl('/app/trip-form');
      this.notifyService.onCustomErrorNotify('Error', 'Please try again');

    }

  }


  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  };

  onListAmenities() {
    if (this.lodgeSelected && this.lodgeSelected.amenities) {
      this.listArray = this.lodgeSelected.amenities.split(', ');
    } else {
      this.listArray = [];
    }
  };

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  };



}
