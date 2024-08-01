import { inject, Injectable, signal } from '@angular/core';
import { OtherFlight, SearchParameters } from '../interfaces/google-flights-response.interface';
import { BaseService } from './base-service';
import { NotifyService } from '../shared/notify/notify.service';
import { IVoiageRestaurant } from '../interfaces/food.interface';
import { LocationMarkService } from './location-mark.service';


@Injectable({
  providedIn: 'root',
})
export class FoodService extends BaseService<IVoiageRestaurant>   {

  notifyService=inject(NotifyService);
  locationMarkService=inject(LocationMarkService);

  private restaurantListSignal = signal<IVoiageRestaurant[]>(this.onGetDefaultVoiageRestaurant());

  get restaurant$() {
    return this.restaurantListSignal;
  };


  onGetDefaultVoiageRestaurant(){

      return [
        {
          restaurant_id                 : 0,
          name                          : '',
          description                   : '',
          average_price                 : 0,
          location_mark                 : this.locationMarkService.onGetDefaultVoiageLocationMark(),
          creation_datetime             : new Date(),
          creation_responsible          : 0

        }

       ];
    }


    getAllRestauranSignal() {

      this.findAll().subscribe({
        next: (response: any) => {
          this.restaurantListSignal.set(response);
          response.reverse();
        },
        error: (error: any) => {
          console.error('Error fetching users', error);
          this.notifyService.onError();
        }
      });
    };



  };



