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
      latitude:         this.getLatitudeDestination(),
      longitude:        this.getLongitudeDestination(),
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

  getLatitudeDestination(): number {
    const latitudeDestination = parseFloat(localStorage.getItem('latitudeDestination') ?? '0');
    return latitudeDestination;
  }

  getLongitudeDestination(): number {
    const latitudeDestination = parseFloat(localStorage.getItem('longitudeDestination') ?? '0');
    return latitudeDestination;
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

}
