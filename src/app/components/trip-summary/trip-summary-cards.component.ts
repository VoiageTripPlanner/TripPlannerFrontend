import { Component, inject } from '@angular/core';
import { BudgetService } from '../../services/budged.service';
import { NotifyService } from '../../shared/notify/notify.service';
import { TripService } from '../../services/trip.service';
import { FlightService } from '../../services/flights.service';
import { LodgeService } from '../../services/lodge.service';
import { FoodService } from '../../services/food.service';
import { LocationMarkService } from '../../services/location-mark.service';
import { ITripForm } from '../../interfaces/trip.interface';
import { IBudgetPrices } from '../../interfaces/budget.interface';
import { IVoiageFlight } from '../../interfaces/flights.interface';
import { IVoiageLodge } from '../../interfaces/lodge.interface';
import { IVoiageRestaurant } from '../../interfaces/food.interface';

@Component({
  selector: 'app-trip-summary-cards',
  standalone: true,
  imports: [],
  templateUrl: './trip-summary-cards.component.html',
  styleUrl: './trip-summary-cards.component.scss'
})
export class TripSummaryCardsComponent {

  budgetService       = inject (BudgetService);
  notifyService       = inject (NotifyService);
  tripFormService     = inject (TripService);
  flightService       = inject (FlightService);
  lodgeService        = inject (LodgeService);
  foodService         = inject (FoodService);
  locationMark        = inject (LocationMarkService);



  initialForm         : ITripForm;
  tripBudget          : IBudgetPrices;
  flightSelected      : IVoiageFlight;
  lodgeSelected       : IVoiageLodge;
  foodSelectedlist    : IVoiageRestaurant[];

  isLoading           : boolean = false;
  listArray           : string[]= [];
  restaurantCount     : number = 0;


  constructor() { 

    this.initialForm            = this.tripFormService.getFormData();
    this.tripBudget             = this.budgetService.getBudgetData();

    //Data seleccionada por el usuario
    this.flightSelected         = this.flightService.getFlightData();
    this.lodgeSelected          = this.lodgeService.getLodgeData();
    this.foodSelectedlist       = this.foodService.getFoodData();
    this.foodSelectedlist       = this.foodSelectedlist.filter(food => food.name !== '');

    this.onListAmenities();
    this.restaurantCount=this.foodSelectedlist.length; 

  }


  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  }

  onListAmenities(){
    this.listArray = this.lodgeSelected.amenities ? this.lodgeSelected.amenities.split(', ') : [];
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }



}
