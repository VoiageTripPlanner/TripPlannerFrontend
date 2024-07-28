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
// export class FoodCardComponent implements OnInit {
export class FoodCardComponent {

  service = inject(YelpFoodService);
  notifyService = inject(NotifyService);
  tripFormService = inject(TripService);
  yelpFoodResponseList: IFoodBusiness[] = []

  initialForm: ITripForm;

  constructor() {

    // this.initialForm = this.tripFormService.tripForm$();
      this.initialForm = this.tripFormService.getFormData();
    this.sendData();

  };

  // ngOnInit(): void {
  //   debugger;
  //   this.initialForm = this.tripFormService.getFormData();
  //   this.sendData();


  // }


  sendData() {
    debugger;

    const data: IYelpApiSearchParams = {
      latitude: this.initialForm.latitude,
      longitude: this.initialForm.longitude,
    };

    this.service.getAllSignal(data);


    debugger
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

}
