import { Component, effect, inject, OnInit } from '@angular/core';
import { YelpFoodService } from '../../../services/api-request/yelp-food.service';
import { IFoodBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-food-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../../shared/notify/notify.service';
import { TripService } from '../../../services/trip.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { BudgetService } from '../../../services/budged.service';
import { Router } from '@angular/router';
import { IBudgetPrices } from '../../../interfaces/budget.interface';
import { IVoiageRestaurant } from '../../../interfaces/food.interface';
import { FoodService } from '../../../services/food.service';
import { LocationMarkService } from '../../../services/location-mark.service';
import { ILocationMark } from '../../../interfaces/location-mark.interface';

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

  initialForm: ITripForm;
  tripBudget:IBudgetPrices;
  isLoading: boolean = false;

  foodSelectedOption: IVoiageRestaurant; 
  foodSelectedList : IVoiageRestaurant[]; 


  yelpFoodResponseList: IFoodBusiness[] = []
  
  
  constructor(
    private router: Router,
    
  ) {

    this.foodSelectedOption   =this.foodService.onGetDefaultVoiageRestaurant();
    this.foodSelectedList     =this.foodService.onGetDefaultVoiageRestaurantList();  

    this.initialForm          =this.tripFormService.getFormData();
    this.tripBudget           =this.budgetService.getBudgetData();

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

    let amount=0; //esto mientras se implementa la IA para determinar el precio 

    if (!amount) {
      amount = 0;
    }

    const classification = 'food';

    this.budgetService.updateSpending(amount, classification);

    // this.router.navigateByUrl('/summary);

    //Esto temporalmente mientras se completan demas componentes y borrar bien el local storage cuando se completa el flujo 

  }


  checkboxChange(yelpFood:IFoodBusiness, event: any): void {

    this.foodSelectedOption=this.foodFilterInfo(yelpFood);

    if (event.target.checked) {

      this.foodService.addItem(this.foodSelectedOption);
      this.notifyService.onCustomSimpleNotify('Added to the list', 'The restaurant has been added to the list');

    } else {

      this.foodSelectedOption.yelpId ? this.foodService.removeItem(this.foodSelectedOption.yelpId)  : 0;
      this.notifyService.onCustomSimpleNotify('Remove from the list', 'The restaurant has been removed of the list');
    }
  }


  foodFilterInfo(yelpFood:IFoodBusiness): IVoiageRestaurant {  

    let locationMark:ILocationMark              = this.locationMark.onGetDefaultVoiageLocationMark();
    locationMark.latitude                       = yelpFood?.coordinates?.latitude ?? 0;
    locationMark.longitude                      = yelpFood?.coordinates?.longitude ?? 0;

    this.foodSelectedOption.name                = yelpFood.name   || " ";
    this.foodSelectedOption.description         = yelpFood.alias  || " ";
    // this.foodSelectedOption.average_price       = yelpFood.price || 0; //aca se debe de aplcar el precio promedioque se obtenga con la IA
    this.foodSelectedOption.location_mark       = locationMark    || this.locationMark.onGetDefaultVoiageLocationMark();

    //Necesito un id para le manejo del array , uso este de la respuesta del API
    this.foodSelectedOption.yelpId              = yelpFood.id     || " ";

    return this.foodSelectedOption;
  };

}
