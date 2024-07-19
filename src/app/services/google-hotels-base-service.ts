import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces';
import { Inject, Injectable, inject } from '@angular/core';
import { ISearchParameters } from '../interfaces/lodge';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelsBaseService<T> {
  protected source!: string;
  protected http = inject(HttpClient);
  private hotelsBaseUrl=`/api/search?engine=google_hotels`

  private api_key: string = environment.google_hotels;

  // constructor(@Inject('environment') private hotelsApiKey: any){};
  

  public findAllHotels(searchParams:ISearchParameters ): Observable<IResponse<T[]>> {
    const body = {
      q: searchParams.q,
      check_in_date: searchParams.check_in_date,
      check_out_date: searchParams.check_out_date,
      api_key: this.api_key,
    };
    debugger;
    return this.http.post<IResponse<T[]>>(this.hotelsBaseUrl, body);
  }


}
