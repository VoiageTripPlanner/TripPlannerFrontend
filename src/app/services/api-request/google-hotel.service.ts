import { Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ISearchParameters } from '../../interfaces/google-hotel-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelService extends BaseService<ISearchParameters> {
  protected override source: string = 'api/hotels';
  private countryListSignal = signal<ISearchParameters>({});
  get country$() {
    return this.countryListSignal;
  }
  getAllSignal(searchParams:ISearchParameters) {
    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {
        this.countryListSignal.set(response.properties);
      },
      error: (error: any) => {
        console.error('Error fetching Google Hotels list', error);
      }
    });
  }

}
