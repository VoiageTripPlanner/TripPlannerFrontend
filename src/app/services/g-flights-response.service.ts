import { GFlightsBaseService } from './g-flights-base-service';
import { Injectable, signal } from '@angular/core';
import { IFlights } from '../interfaces/flights';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class GFlightsResponseService extends GFlightsBaseService<IFlights>   {


  private flightsListSignal = signal<IFlights[]>([]);

  };

  getAllHotelsSignal(searchParams:ISearchParameters) {

    debugger;
    this.searchFlights(searchParams).subscribe({
      next: (response: any) => {
        this.hotelsListSignal.set(response);
        console.log(response);
        response.reverse();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching users', error);
      }
    });
	