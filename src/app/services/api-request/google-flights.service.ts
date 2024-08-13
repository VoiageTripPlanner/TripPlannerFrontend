import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { IGFlightsResponse, OtherFlight, SearchParameters } from '../../interfaces/google-flights-response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../shared/notify/notify.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleFlightsService extends BaseService<IGFlightsResponse> {

  notifyService=inject(NotifyService);
  
  protected override source: string = 'api/flights';

  private gFlightsResponseSignal = signal<OtherFlight[]>([]);


  get googleFlightsResponse$() {
    return this.gFlightsResponseSignal;
  }

  getAllSignal(searchParams: SearchParameters) {

    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {
        this.gFlightsResponseSignal.set(response.other_flights);
      },
      error: (error: HttpErrorResponse) => {
        this.notifyService.onError();

        console.error('Error fetching Google Flights list', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('URL:', error.url);
      }
    });
  }
}
