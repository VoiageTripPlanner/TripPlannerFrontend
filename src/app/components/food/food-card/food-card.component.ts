import { Component, effect, inject, OnInit } from '@angular/core';
import { YelpFoodService } from '../../../services/api-request/yelp-food.service';
import { IFoodBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-food-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../../shared/notify/notify.service';
import { MapsComponent } from '../../maps/maps.component';
import { TripService } from '../../../services/trip.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { BudgetService } from '../../../services/budged.service';
import { Router } from '@angular/router';
import { IBudgetPrices } from '../../../interfaces/budget.interface';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    MapsComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {

  budgetService = inject(BudgetService);
  service = inject(YelpFoodService);
  notifyService = inject(NotifyService);
  tripFormService = inject(TripService);

  initialForm: ITripForm;
  tripBudget:IBudgetPrices;


  yelpFoodResponseList: IFoodBusiness[] = []
  
  
  constructor(
    private router: Router,
  ) {
    this.initialForm    = this.tripFormService.getFormData();
    this.tripBudget     =this.budgetService.getBudgetData();

    this.sendData();

  };


  sendData() {

    const data: IYelpApiSearchParams = {
      latitude: this.initialForm.latitude,
      longitude: this.initialForm.longitude,
    };

    this.service.getAllSignal(data);

    effect(() => {
      this.yelpFoodResponseList = this.service.yelpFoodResponse$();
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

  selectOption(amount: number) {


    if (!amount) {
      amount = 0;
    }

    const classification = 'food';

    this.budgetService.updateSpending(amount, classification);

    this.router.navigateByUrl('/app/dashboard');


  }

}
