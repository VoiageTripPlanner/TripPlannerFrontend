import { inject, Injectable, signal } from '@angular/core';
import { ILodge, ISearchParameters } from '../interfaces/lodge';
import { GoogleHotelsBaseService } from './google-hotels-base-service';
import { Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelsResponseService extends GoogleHotelsBaseService<ILodge>   {


  private hotelsListSignal = signal<ILodge[]>([]);

  get hotels$() {
    return this.hotelsListSignal;
  };

  getAllHotelsSignal(searchParams:ISearchParameters) {

    debugger;
    this.findAllHotels(searchParams).subscribe({
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
  };


}
