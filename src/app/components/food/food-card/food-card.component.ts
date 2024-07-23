import { Component, effect, inject } from '@angular/core';
import { YelpFoodService } from '../../../services/api-request/yelp-food.service';
import { IFoodBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-food-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../../shared/notify/notify.service';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './food-card.component.html',
  styleUrl: './food-card.component.scss'
})
export class FoodCardComponent {

  service = inject(YelpFoodService);
  notifyService = inject(NotifyService);
  yelpFoodResponseList: IFoodBusiness[] = []

  latitude: number = 35.659107;
  longitude:number = 139.700343;
  resultado: any;

  constructor() {
    this.sendData();
  };

  sendData() {
    const datos: IYelpApiSearchParams = {
      latitude: this.latitude,
      longitude: this.longitude,
    };



    this.service.getAllSignal(datos);
    effect(() => {
      
      this.yelpFoodResponseList = this.service.yelpFoodResponse$();
      console.log(this.yelpFoodResponseList);
    })

  };

  trackByIndex(index: number, googleHotelResponseList: IFoodBusiness): number {
    return index;
  };

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  };

  visitSite(url: string | undefined): void {
    if (url) {
      window.open(url,'_blank') ;
    } else {
      this.notifyService.onNoData();
    }
  };

}
