import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces/index.interface';
import { Inject, Injectable, inject } from '@angular/core';
import { ISearchParameters } from '../interfaces/google-hotel-response.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelsBaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);
  private hotelsBaseUrl=`https://serpapi.com/search?engine=google_hotels`

  private api_key: string = environment.google_hotels;


  public findAllHotels(searchParams: ISearchParameters): Observable<IResponse<T[]>> {
    let params = new HttpParams()
      .set('q', searchParams.q)
      .set('check_in_date', searchParams.check_in_date.toString())
      .set('check_out_date', searchParams.check_out_date.toString())
      .set('api_key', this.api_key);
    
    return this.http.get<IResponse<T[]>>(this.hotelsBaseUrl, { params }).pipe(

    );
  }




}
