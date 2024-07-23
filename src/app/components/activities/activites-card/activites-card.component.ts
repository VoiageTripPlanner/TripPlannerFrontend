import { Component, effect, inject } from '@angular/core';
import { YelpActivitiesService } from '../../../services/api-request/yelp-activities.service';
import { IActivitiesBusiness, IYelpApiSearchParams } from '../../../interfaces/yelp-activities-response.interface';
import { MapComponent } from '../../map/map.component';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activites-card',
  standalone: true,
  imports: [
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './activites-card.component.html',
  styleUrl: './activites-card.component.scss'
})
export class ActivitesCardComponent {

  service = inject(YelpActivitiesService);
  yelpActiviitesResponseList: IActivitiesBusiness[] = []

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
      
      this.yelpActiviitesResponseList = this.service.yelpActivitiesResponse$();
      console.log(this.yelpActiviitesResponseList);
    })

  };

  trackByIndex(index: number, googleHotelResponseList: IActivitiesBusiness): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

}
