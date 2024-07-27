import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces/index.interface';
import { inject, Injectable } from '@angular/core';
import { SearchParameters } from '../interfaces/google-flights-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GFlightsBaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);
  private flightsBaseUrl=`https://serpapi.com/search?`
;
  public searchFlights(searchParams: SearchParameters): Observable<IResponse<T[]>> {
    let params = new HttpParams()
      .set('engine', searchParams.engine || 'google-flights')
      .set('currency', searchParams.currency || '')
      .set('hl', searchParams.hl || '')
      .set('gl', searchParams.gl || '')
      .set('departure_id', searchParams.departure_id || '')
      .set('arrival_id', searchParams.arrival_id || '')
      .set('outbound_date', searchParams.outbound_date?.toISOString() || '')
      .set('travel_class', searchParams.travel_class || '')

    if (searchParams.type === '1') {
      params = params
        .set('type', searchParams.type || '')
        .set('return_date', searchParams.return_date?.toISOString() || '');  
    } else if (searchParams.type === '2') {
      // Do nothing, skip capturing the data
    } else {
      alert('Invalid type value');
    }

    debugger;
    return this.http.get<IResponse<T[]>>(this.flightsBaseUrl, { params }).pipe(
    );
  }
}