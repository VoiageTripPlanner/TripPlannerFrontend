import { inject, Injectable, signal } from '@angular/core';
import { OtherFlight, SearchParameters } from '../interfaces/google-flights-response.interface';
import { BaseService } from './base-service';
import { IVoiageFlight } from '../interfaces/flights.interface';
import { NotifyService } from '../shared/notify/notify.service';


@Injectable({
  providedIn: 'root',
})
export class FlightService extends BaseService<IVoiageFlight>   {

  notifyService=inject(NotifyService);

  private flightsListSignal = signal<IVoiageFlight>(this.onGetDefaultVoiageFlight());

  private storageKey = 'flight';

  get flights$() {
    return this.flightsListSignal;
  };


  onGetDefaultVoiageFlight(){

    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue: IVoiageFlight = {
      flight_id             : 0,
      departure_airport     : '',
      arrival_airport       : '',
      airline               : '',
      airline_logo          : '',
      travel_class          : '',
      flight_number         : '',
      start_date            : getNextDay(),
      booking_token         : '',
      price                 : 0,
      type                  : '',
      creation_datetime     : new Date(),
      creation_responsible  : 0, // aca debe de ir el id del usuario logueado
      operational           : 1,  
    }

    return defaultValue;

  }

  getAllFlightsSignal() {

    this.findAll().subscribe({
      next: (response: any) => {
        this.flightsListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
        this.notifyService.onError();
      }
    });
  };


  saveVoiageFlightData(formData: IVoiageFlight): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getFlightData(): IVoiageFlight {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {

      const formData = JSON.parse(formDataString);
      return formData;

    } else {

      return this.onGetDefaultVoiageFlight();
      
    }
  }
}