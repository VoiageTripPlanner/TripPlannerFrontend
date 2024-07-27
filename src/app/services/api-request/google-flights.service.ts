import { Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { IGFlightsResponse, OtherFlight, SearchParameters } from '../../interfaces/google-flights-response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleFlightsService extends BaseService<IGFlightsResponse> {
  protected override source: string = 'api/flights';

  private gFlightsResponseSignal = signal<OtherFlight>({});


  get googleFlightsResponse$() {
    return this.gFlightsResponseSignal;
  }

  getAllSignal(searchParams: SearchParameters) {
    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {
        
        console.log(response.other_flights);
        this.gFlightsResponseSignal.set(response.other_flights);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching Google Flights list', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('URL:', error.url);
      }
    });
  }
}
