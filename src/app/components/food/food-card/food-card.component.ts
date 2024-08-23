import { Component, effect, inject, OnInit } from '@angular/core';
import { YelpFoodService } from '../../../services/api-request/yelp-food.service';
import { IFoodBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-food-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../../shared/notify/notify.service';
import { TripService } from '../../../services/voiage-services/trip.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { BudgetService } from '../../../services/budged.service';
import { Router } from '@angular/router';
import { IBudgetPrices } from '../../../interfaces/budget.interface';
import { IVoiageRestaurant } from '../../../interfaces/food.interface';
import { LocationMarkService } from '../../../services/location-mark.service';
import { ILocationMark } from '../../../interfaces/location-mark.interface';
import { FoodService } from '../../../services/voiage-services/food.service';
import { IPlaceSearchResult } from '../../../interfaces/placeSearch';
import { MapsService } from '../../../services/map.service';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    MapComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {

  budgetService           = inject(BudgetService);
  service                 = inject(YelpFoodService);
  notifyService           = inject(NotifyService);
  tripFormService         = inject(TripService);
  foodService             = inject(FoodService);
  locationMark            = inject(LocationMarkService);
  mapsService             = inject(MapsService);

  initialForm             : ITripForm;
  tripBudget              : IBudgetPrices;
  isLoading               : boolean = false;

  foodSelectedOption      : IVoiageRestaurant; 
  foodSelectedList        : IVoiageRestaurant[]; 


  yelpFoodResponseList    : IFoodBusiness[] = []
  foodLocalsNerby         : IPlaceSearchResult[]
  fromValue               : IPlaceSearchResult = { address: '' };
  zoomToPlace             : IPlaceSearchResult = { address: '' };
  
  constructor(
    private router: Router,
    
  ) {

    this.foodSelectedOption   = this.foodService.onGetDefaultVoiageRestaurant();
    this.foodSelectedList     = this.foodService.onGetDefaultVoiageRestaurantList();  
    this.foodLocalsNerby      = this.mapsService.onGetDefaultSearchResultList();    

    this.initialForm          = this.tripFormService.getFormData();
    this.tripBudget           = this.budgetService.getBudgetData();

    this.sendData();

  };


  sendData() {
    this.isLoading = true;
    
    const data: IYelpApiSearchParams = {
      latitude: this.initialForm.latitude,
      longitude: this.initialForm.longitude,
    };
    
    this.service.getAllSignal(data);

    effect(() => {
      this.yelpFoodResponseList = this.service.yelpFoodResponse$();
      if (this.yelpFoodResponseList.length > 0) {
        debugger
        this.assingfoodLocalsNerby(this.yelpFoodResponseList);
        this.isLoading=false;
      }
    })

  };


  generateId() {
    return Math.random().toString(36).substring(2, 9);
  };

  visitSite(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      this.notifyService.onNoData();
    }
  };

  selectOption(yelpFood:IFoodBusiness, event: any): void {

    let amount=0; 

    if (!amount) {
      amount = 0;
    }

    const classification = 'food';

    this.budgetService.updateSpending(amount, classification);

  }


  checkboxChange(yelpFood:IFoodBusiness, event: any): void {

    this.foodSelectedOption=this.foodFilterInfo(yelpFood);

    if (event.target.checked) {

      this.foodService.addItem(this.foodSelectedOption);
      this.notifyService.onCustomSimpleNotify('Added to the list', 'The restaurant has been added to the list');

    } else {

      this.foodSelectedOption.yelpId ? this.foodService.removeItem(this.foodSelectedOption.yelpId)  : 0;
      this.notifyService.onCustomSimpleNotify('Removed from the list', 'The restaurant has been removed of the list');
    }
  }


  foodFilterInfo(yelpFood:IFoodBusiness): IVoiageRestaurant {  

    let locationMark:ILocationMark                = this.locationMark.onGetDefaultVoiageLocationMark();
    locationMark.latitude                         = yelpFood?.coordinates?.latitude ?? 0;
    locationMark.longitude                        = yelpFood?.coordinates?.longitude ?? 0;

    this.foodSelectedOption.name                  = yelpFood.name   || " ";
    this.foodSelectedOption.description           = yelpFood.alias  || " ";
    this.foodSelectedOption.locationMark          = locationMark    || this.locationMark.onGetDefaultVoiageLocationMark();

    //Datos que no persisten en la BD 
    this.foodSelectedOption.yelpId                = yelpFood.id     || " ";
    this.foodSelectedOption.restaurantImage       = yelpFood.image_url || "./assets/img/No_image_available.png";
    this.foodSelectedOption.addressLocation       = yelpFood?.location?.display_address?.join(", ") || " ";
    this.foodSelectedOption.locationCityCountry   = yelpFood?.location?.city + ", " + yelpFood?.location?.country || " ";

    return this.foodSelectedOption;
  };

  assingfoodLocalsNerby(yelpFoodResponseList: IFoodBusiness[]): void {

    this.foodLocalsNerby = yelpFoodResponseList.map((foodBusiness: IFoodBusiness) => ({
      address: foodBusiness.location?.address1 || '', 
      name: foodBusiness.name,
      latitude: foodBusiness.coordinates?.latitude,
      longitude: foodBusiness.coordinates?.longitude,
      location: new google.maps.LatLng(foodBusiness.coordinates?.latitude || 0, foodBusiness.coordinates?.longitude || 0),
    }));
    debugger
  }

  ViewDestination() {
    const storedPlace = localStorage.getItem('destinationLocation');
    if (storedPlace) {
      this.fromValue = JSON.parse(storedPlace);
    }
  }

  viewInMap(yelpFood:IFoodBusiness) {

    const place: IPlaceSearchResult = {
      address: yelpFood.location?.address1 || '',
      name: yelpFood.name,
      latitude: yelpFood.coordinates?.latitude || 0,
      longitude: yelpFood.coordinates?.longitude || 0,
      location: new google.maps.LatLng(yelpFood.coordinates?.latitude || 0, yelpFood.coordinates?.longitude || 0),
    };

    this.zoomToPlace = place; 
  }

  

}
