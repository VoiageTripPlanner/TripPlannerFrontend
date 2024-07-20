import { inject, Injectable, signal } from '@angular/core';
import { IGoogleResponse, ISearchParameters } from '../interfaces/google-hotel-response.interface';
import { GoogleHotelsBaseService } from './google-hotel-resquest-base-service';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces/index.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelsResponseService extends GoogleHotelsBaseService<IGoogleResponse>   {


  private hotelsListSignal = signal<IGoogleResponse[]>([]);

  get hotels$() {
    return this.hotelsListSignal;
  };

  getAllHotelsSignal(searchParams:ISearchParameters) {

    
    this.findAllHotels(searchParams).subscribe({
      next: (response: any) => {
        this.hotelsListSignal.set(response);
        console.log(response);
        response.reverse();
      },
      error: (error: any) => {
        
        console.error('Error fetching users', error);
      }
    });
  };


}
