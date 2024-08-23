import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ICountry } from '../../interfaces/country.interface';
import { ITripForm, ITrip, ITripDestinationCountry } from '../../interfaces/trip.interface';
import { IVoiageRestaurant } from '../../interfaces/food.interface';
import { LodgeService } from './lodge.service';
import { FlightService } from './flights.service';
import { FoodService } from './food.service';
import { ActivityService } from './activityService';
import { NotifyService } from '../../shared/notify/notify.service';

@Injectable({
  providedIn: 'root',
})
export class TripService extends BaseService<ITripForm> {
  lodgeService            = inject(LodgeService);
  flightService           = inject(FlightService);
  foodService             = inject(FoodService);
  activitiesService       = inject(ActivityService);
  notifyService           = inject(NotifyService);

  protected override source: string = 'trip';
  private storageKey      = 'tripFormData';

  
  
  private tripFormSignal = signal<ITripForm>(this.onGetDefaultTripForm());
  private tripSignal = signal<ITrip>(this.onGetDefaultTrip());

  get tripForm$() {
    return this.tripFormSignal;
  };

  get trip$() {
    return this.tripSignal;
  };



  onGetDefaultTripForm() {

    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const getTowDaysAhead = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 4));
    };


    const defaultValue: ITripForm = {
      q: '',
      check_in_date: getNextDay(),
      check_out_date: getTowDaysAhead(),
      latitude: this.getLatitudeDestination(),
      longitude: this.getLongitudeDestination(),
      departure_id: '',
      arrival_id: '',
      outbound_date: getNextDay(),
      return_date: getNextDay(),
      stops: 0,
      type: 1,
      travel_class: 1,
    }

    return defaultValue;

  };


  setInitialForm(data: ITripForm) {
    this.tripFormSignal.set(data);
  };

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
  };

  saveTrip(event: ITrip): Observable<any> {
    
    return this.add(event).pipe(
      tap((response: any) => {
        this.tripSignal.update(() => response );
        this.notifyService.onCustomSimpleNotify('All good...', 'Trip Saved !'); 
      }),
      catchError(error => {
        console.error('Error saving user', error);
        this.notifyService.onCustomErrorNotify('Something goes wrong !', 'Error !'); 
        return throwError(error);
      })
    );
  };

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
  };


  //Valores por defecto para un trip

  onGetDefaultTrip() {

    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue: ITrip = {
      tripId: 0,
      name: '',
      description: '',
      departureDate: getNextDay(),
      destinationCity: '',
      returnDate: getNextDay(),
      lodge: this.lodgeService.onGetDefaultVoiageLodge(),
      flight: this.flightService.onGetDefaultVoiageFlight(),
      restaurants: this.foodService.onGetDefaultVoiageRestaurantList(),
      activities: this.activitiesService.onGetDefaultVoiageActivities(),
      user: 0,
      creationDatetime: getNextDay(),
      creationResponsible: 0,
      activitiesEstimatedCost: 0,
      restaurantsEstimatedCost: 0,
      destinationCountry: this.onGetDefaultDestinatonCountry()
    }

    return defaultValue;
  };


  onGetDefaultDestinatonCountry() {
    
    const defaultValue: ITripDestinationCountry = {
      countryName: '',
      countryCode: 'N/A'
    }

    return defaultValue
  };


}

