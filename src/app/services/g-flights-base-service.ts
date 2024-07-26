import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IResponse } from '../interfaces';
import { inject } from '@angular/core';
import { SearchParameters } from '../interfaces/gFlights-Response';

export class GFlightsBaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);
  private flightsBaseUrl=`https://serpapi.com/search?`

  public searchFlights(searchParams: SearchParameters): Observable<IResponse<T[]>> {
    let params = new HttpParams()
      .set('engine', searchParams.engine)
      .set('currency', searchParams.currency)
      .set('hl', searchParams.hl)
      .set('gl', searchParams.gl)
      .set('type', searchParams.type)
      .set('departure_id', searchParams.departure_id)
      .set('arrival_id', searchParams.arrival_id)
      

      .set('q', searchParams.q)

      .set('check_in_date', searchParams.check_in_date.toString())
      .set('check_out_date', searchParams.check_out_date.toString())
    debugger;
    return this.http.get<IResponse<T[]>>(this.flightsBaseUrl, { params }).pipe(

    );
  }




}