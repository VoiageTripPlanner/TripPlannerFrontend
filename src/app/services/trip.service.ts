import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ITripForm,ITrip } from '../interfaces/trip.interface';
import { IVoiageRestaurant } from '../interfaces/food.interface';
import { LodgeService } from './lodge.service';
import { FlightService } from './flights.service';
import { FoodService } from './food.service';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<ITripForm> {

  protected override source: string = 'trip';
  private storageKey = 'tripFormData';

  private tripFormSignal = signal<ITripForm>(this.onGetDefaultTripForm());

  lodgeService=inject(LodgeService);
  flightService=inject(FlightService);
  foodService=inject(FoodService);
  activitiesService=inject(ActivitiesService);


  get tripForm$() {
    return this.tripFormSignal;
  }

  onGetDefaultTripForm (){

    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const getTowDaysAhead = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 4));
    };


    const defaultValue:ITripForm={
      q:                '',
      check_in_date:    getNextDay(),
      check_out_date:   getTowDaysAhead(),
      latitude:         0,
      longitude:        0,
      departure_id:     '',
      arrival_id:       '',
      outbound_date:    getNextDay(),
      return_date:      getNextDay(),
      stops:            0,
      type:             1,
      travel_class:     1,
    }

    return defaultValue;

  }


  setInitialForm(data:ITripForm){
    this.tripFormSignal.set(data);
  }


  getAllSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.tripFormSignal.set(response);
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }
    });
  };


  saveFormData(formData: ITripForm): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getFormData(): ITripForm {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {
      const formData = JSON.parse(formDataString);
      
      // Convertir los Dates
      formData.check_in_date = new Date(formData.check_in_date);
      formData.check_out_date = new Date(formData.check_out_date);
      formData.outbound_date = new Date(formData.outbound_date);
      formData.return_date = new Date(formData.return_date);
      return formData;
    } else {
      return this.onGetDefaultTripForm();
    }
  }


  //Valores por defecto para un trip
    
  onGetDefaultTrip(){
    
    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue:ITrip={
      trip_id                         : 0,
      trip_name                       : '',
      trip_description                : '',
      departure_date                  : getNextDay(),
      destination_city                : '',
      return_date                     : getNextDay(),
      lodge                           : this.lodgeService.onGetDefaultVoiageLodge(),
      flight                          : this.flightService.onGetDefaultVoiageFlight(),
      food                            : this.foodService.onGetDefaultVoiageRestaurantList(),
      activities                      : this.activitiesService.onGetDefaultVoiageActivities(),
      user_id                         : 0,
      creation_datetime               : getNextDay(),
      creation_responsible            : 0
    }

    return defaultValue;
  }


}
