import { Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../interfaces/country.interface';
import { ITripForm } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<ITripForm> {
  protected override source: string = 'trip';
  private tripFormSignal = signal<ITripForm>(this.onGetDefaultTripForm());
  private storageKey = 'tripFormData';


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
      type:             1
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
    const formData = localStorage.getItem(this.storageKey);
    return formData ? JSON.parse(formData) : this.onGetDefaultTripForm();
  }

}
