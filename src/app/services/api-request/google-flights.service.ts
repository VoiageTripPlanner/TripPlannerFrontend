import { Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { IGFlightsResponse, SearchParameters } from '../../interfaces/gFlights-Response';

@Injectable({
  providedIn: 'root'
})
export class GoogleFlightsService extends BaseService<IGFlightsResponse> {
  protected override source: string = 'api/flights';

  private gFlightsResponseSignal = signal<IGFlightsResponse[]>([]);


  get googleFlightsResponse$() {
    return this.gFlightsResponseSignal;
  }

  getAllSignal(searchParams: SearchParameters) {
    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {
        
        console.log(response.properties);
        this.gFlightsResponseSignal.set(response.properties);
      },
      error: (error: any) => {
        
        console.error('Error fetching Google Flights list', error);
      }
    });
  }
}
