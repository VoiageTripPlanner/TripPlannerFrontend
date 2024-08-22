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
import { LocationMarkService } from '../../services/location-mark.service';
import { AuthService } from '../../services/auth.service';
import { IActivity } from '../../interfaces/activities.interface';
import { ActivityService } from '../../services/voiage-services/activity.service';
import { CurrencyService } from '../../services/currency.service';
import { ICurrency } from '../../interfaces/currency.interface';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-trip-information',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
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
  locationMark        = inject (LocationMarkService);
  lodgeService        = inject (LodgeService);
  notifyService       = inject (NotifyService);
  tripFormService     = inject (TripService);
  tripService         = inject (TripService);
  userService         = inject (UserService);


  activitiesSelectedList        : IActivity[] ; 
  flightSelected                : IVoiageFlight ;
  foodSelectedlist              : IVoiageRestaurant[] ;
  initialForm                   : ITripForm ;
  lodgeSelected                 : IVoiageLodge ;
  tripBudget                    : IBudgetPrices ;
  userInfo                      : IUser;

  tripNgModel                   : ITrip;
  userId                        : number;

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
    this.activitiesSelectedList   = this.activitiesSelectedList.filter(activity => activity.address !== '');

    //Data del perfil del usuario
    this.userInfo                 = this.userService.userSig();

  }



  onSaveTrip(formTripInfo: any, event:Event) {

    event.preventDefault();

    if (formTripInfo.valid) {
      
      this.notifyService.onCustomConfirmation('Do you want to save this info ?', 'The trip info will be stored', 'Yes, sure!').then((result) => {
        if (result.isConfirmed) {
      
          
          this.assignTripData();
          this.tripService.saveTrip(this.tripNgModel).subscribe(
            () => {
              this.notifyService.onCustomSimpleNotify('Trip Saved', 'The trip information has been saved successfully');
            }
          )
          
          console.log(this.tripNgModel); 
          
          
          this.removeLocalStorage() 
          this.router.navigateByUrl('/app/dashboard')
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
        this.router.navigateByUrl('/app/trip-form');
      };

    });
  };


  private removeLocalStorage() {

    localStorage.removeItem('tripFormData');
    localStorage.removeItem('budget');
    localStorage.removeItem('flight');
    localStorage.removeItem('lodge');
    localStorage.removeItem('food');
    localStorage.removeItem('nearbyPlaces');      
    localStorage.removeItem('destinationAddress');      
    localStorage.removeItem('longitudeDestination');      
    localStorage.removeItem('latitudeDestination');      
    localStorage.removeItem('destinationName');      
    localStorage.removeItem('destinationLocation');      
    localStorage.removeItem('selectedActivities');      


  };


  assignTripData(){
    debugger;
    this.tripNgModel.departureDate                      = this.initialForm.outbound_date;
    this.tripNgModel.destinationCity                    = this.initialForm.q;  
    this.tripNgModel.returnDate                         = this.initialForm.return_date;
    this.tripNgModel.budget                             = this.tripBudget.total;
    this.tripNgModel.currency                           = Number(this.userInfo.currencyId ); 
    this.tripNgModel.lodge                              = this.lodgeSelected;
    this.tripNgModel.flight                             = this.flightSelected;
    this.tripNgModel.restaurants                        = this.foodSelectedlist;
    this.tripNgModel.activities                         = this.activitiesSelectedList; 
    this.tripNgModel.user                               = this.userId;
    this.tripNgModel.aiSuggestion                       = ''; //Para cuando se implemente AI
    // this.tripNgModel.ai_suggestions               =this.aiSuggestions; //Para cuando se implemente AI
    this.tripNgModel.creationDatetime                   = new Date(); 
    this.tripNgModel.creationResponsible                = this.userId;

    this.tripNgModel.activitiesEstimatedCost            = this.tripBudget.activitiesAmount;
    this.tripNgModel.restaurantsEstimatedCost           = this.tripBudget.foodAmount;
    this.tripNgModel.destinationCountry.countryName     = this.initialForm.q;

  }


}
