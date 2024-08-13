import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyService } from '../../shared/notify/notify.service';
import { ITrip, ITripForm } from '../../interfaces/trip.interface';
import { TripService } from '../../services/voiage-services/trip.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBudgetPrices } from '../../interfaces/budget.interface';
import { IVoiageFlight } from '../../interfaces/flights.interface';
import { IVoiageLodge } from '../../interfaces/lodge.interface';
import { IVoiageRestaurant } from '../../interfaces/food.interface';
import { BudgetService } from '../../services/budged.service';
import { FlightService } from '../../services/voiage-services/flights.service';
import { LodgeService } from '../../services/voiage-services/lodge.service';
import { FoodService } from '../../services/voiage-services/food.service';
import { MapLocationService } from '../../services/map-location.service';
import { AuthService } from '../../services/auth.service';
import { IActivity } from '../../interfaces/activities.interface';
import { ActivityService } from '../../services/voiage-services/activity.service';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-trip-information',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './trip-information.component.html',
  styleUrl: './trip-information.component.scss'
})


export class TripInformationComponent {

  authService         = inject (AuthService);
  activitiesService   = inject (ActivityService);
  budgetService       = inject (BudgetService);
  currencyService     = inject (CurrencyService);
  flightService       = inject (FlightService);
  foodService         = inject (FoodService);
  location            = inject (MapLocationService);
  lodgeService        = inject (LodgeService);
  notifyService       = inject (NotifyService);
  tripFormService     = inject (TripService);
  tripService         = inject (TripService);


  activitiesSelectedList        : IActivity[] ; 
  flightSelected                : IVoiageFlight ;
  foodSelectedlist              : IVoiageRestaurant[] ;
  initialForm                   : ITripForm ;
  lodgeSelected                 : IVoiageLodge ;
  tripBudget                    : IBudgetPrices ;
  // userCurrency                  : ICurrency[];

  tripNgModel         : ITrip;
  userId              :number;

  constructor( 
    private router: Router,
  ) { 
    this.tripNgModel            = this.tripService.onGetDefaultTrip();

    this.userId                 = this.authService.getUserId();
    this.initialForm            = this.tripFormService.getFormData();
    this.tripBudget             = this.budgetService.getBudgetData();

    //Data seleccionada por el usuario
    this.flightSelected           = this.flightService.getFlightData();
    this.lodgeSelected            = this.lodgeService.getLodgeData();
    this.foodSelectedlist         = this.foodService.getFoodData();
    this.foodSelectedlist         = this.foodSelectedlist.filter(food => food.name !== '');
    this.activitiesSelectedList   = this.activitiesService.getActivities();
    this.activitiesSelectedList   = this.activitiesSelectedList.filter(activity => activity.location?.address !== '');

    //Data del perfil del usuario
    // this.userCurrency             = this.currencyService.currenciesSig();

  }



  onSaveTrip(formTripInfo: any, event:Event) {

    event.preventDefault();

    if (formTripInfo.valid) {
      
      this.notifyService.onCustomConfirmation('Do you want to save this info ?', 'The trip info will be stored', 'Yes, sure!').then((result) => {
        if (result.isConfirmed) {
      
          
          this.assignTripData();
          console.log(this.tripNgModel); 
      
          // this.removeLocalStorage()  //descomentar luego de implmentar el servicio de guardar trip 
          // this.router.navigateByUrl('/app/dashboard')
        };
      });
    }else{
      this.notifyService.onNoFormData();
    };

    
  }

  onStartAgain() {

    this.notifyService.onCustomConfirmation('Are you sure?', 'You will lose all the data', 'Yes, Start Again').then((result) => {
      if (result.isConfirmed) {
        this.removeLocalStorage()
      };

    });
  };


  private removeLocalStorage() {

    localStorage.removeItem('tripFormData');
    localStorage.removeItem('budget');
    localStorage.removeItem('flight');
    localStorage.removeItem('lodge');
    localStorage.removeItem('food');
    localStorage.removeItem('selectedActivities');      
    localStorage.removeItem('destinationLocation');      

    this.router.navigateByUrl('/app/trip-form');
  };


  assignTripData(){

    this.tripNgModel.departure_date                 = this.initialForm.outbound_date;
    this.tripNgModel.destination_city               = this.initialForm.q;
    this.tripNgModel.return_date                    = this.initialForm.return_date;
    this.tripNgModel.budget                         = this.tripBudget.total;
    // this.tripNgModel.currency                       = this.userCurrency[0]; //Falta implementar el servicio de currency
    this.tripNgModel.lodge                          = this.lodgeSelected;
    this.tripNgModel.flight                         = this.flightSelected;
    this.tripNgModel.food                           = this.foodSelectedlist;
    this.tripNgModel.activities                     = this.activitiesSelectedList; 
    this.tripNgModel.user_id                        = this.userId;
    // this.tripNgModel.ai_suggestions               =this.aiSuggestions; //Para cuando se implemente AI

    this.tripNgModel.audit || {
      creation_datetime: new Date(),
      creation_responsible: { id: 0 }
    };
  }
}
