import { Component, effect, inject } from '@angular/core';
import { YelpActivitiesService } from '../../../services/api-request/yelp-food.service';
import { IFoodBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-activities-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  service = inject(YelpActivitiesService);
  yelpFoodResponseList: IFoodBusiness[] = []

  latitude: number = 37.786882;
  longitude:number = -122.399972;
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
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

}
