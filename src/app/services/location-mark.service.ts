import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { NotifyService } from '../shared/notify/notify.service';
import { ILocation } from '../interfaces/location.interface';


@Injectable({
  providedIn: 'root',
})
export class LocationMarkService extends BaseService<ILocation>   {

  notifyService=inject(NotifyService);

  private restaurantListSignal = signal<ILocation>(this.onGetDefaultVoiageLocationMark());

  get restaurant$() {
    return this.restaurantListSignal;
  };


  onGetDefaultVoiageLocationMark(){

    const defaultValue: ILocation = {
      id                      : 0,
      LatLng: {
        latitude                     : 0,
        longitude                    : 0,
      },
      address                       : '',
      place_id                     : '',
      user_id                      : 0
    }

    return defaultValue;

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

    saveLocation(location: ILocation) {
      this.add(location).subscribe({
        next: (response: any) => {
          console.log('Location saved successfully', response);
          this.notifyService.onSuccess();
        },
        error: (error: any) => {
          console.error('Error saving location', error);
          this.notifyService.onError();
        }
      });
    }
  }