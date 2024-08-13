import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { NotifyService } from '../../shared/notify/notify.service';
import { IVoiageRestaurant } from '../../interfaces/food.interface';
import { MapLocationService } from '../map-location.service';


@Injectable({
  providedIn: 'root',
})
export class FoodService extends BaseService<IVoiageRestaurant>   {

  notifyService=inject(NotifyService);
  mapLocationService=inject(MapLocationService);

  private restaurantListSignal = signal<IVoiageRestaurant[]>(this.onGetDefaultVoiageRestaurantList());

  private storageKey = 'food';

  get restaurant$() {
    return this.restaurantListSignal;
  };


  onGetDefaultVoiageRestaurantList(){

      return [
        {
          restaurant_id                 : 0,
          name                          : '',
          description                   : '',
          average_price                 : 0,
          location                      : this.mapLocationService.onGetDefaultVoiageLocationMark(),
          audit: {
            creation_datetime: new Date(),
            creation_responsible: { id: 0 },
            lastUpdate_datetime: new Date(),
            update_responsible: { id: 0 },
          }
        }
       ];
    };

  onGetDefaultVoiageRestaurant(){

      const defaultValue:IVoiageRestaurant={
        restaurant_id                 : 0,
        name                          : '',
        description                   : '',
        average_price                 : 0,
        location                      : this.mapLocationService.onGetDefaultVoiageLocationMark(),
        audit: {
          creation_datetime: new Date(),
          creation_responsible: { id: 0 },
          lastUpdate_datetime: new Date(),
          update_responsible: { id: 0 },
        }
      }

      return defaultValue;
    };


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


    saveVoiageFlightData(formData: IVoiageRestaurant[]): void {
      localStorage.setItem(this.storageKey, JSON.stringify(formData));
    };
  
    getFoodData(): IVoiageRestaurant[] {
      const formDataString = localStorage.getItem(this.storageKey);
      if (formDataString) {
        const formData = JSON.parse(formDataString);
        return formData;
      } else {
        return this.onGetDefaultVoiageRestaurantList();
      }
    };

    addItem(item: any): void {
      const items = this.getFoodData();
      items.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    };
  
    removeItem(itemId: string): void {
      let items = this.getFoodData();
      items = items.filter(item => item.yelpId !== itemId);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    };

  };



