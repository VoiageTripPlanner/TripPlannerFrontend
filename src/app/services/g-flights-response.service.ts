import { GFlightsBaseService } from './g-flights-base-service';
import { Injectable, signal } from '@angular/core';
import { OtherFlight, SearchParameters } from '../interfaces/google-flights-response.interface';


@Injectable({
  providedIn: 'root',
})
export class GFlightsResponseService extends GFlightsBaseService<OtherFlight>   {


  private flightsListSignal = signal<OtherFlight>({});
  get flights$() {
    return this.flightsListSignal;
  };

  getAllHotelsSignal(searchParams:SearchParameters) {

    debugger;
    this.searchFlights(searchParams).subscribe({
      next: (response: any) => {
        this.flightsListSignal.set(response.other_flights);
        console.log(response);
        response.reverse();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching users', error);
      }
    });
  };
}