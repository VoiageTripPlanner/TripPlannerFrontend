import { Component, effect, inject } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleFlightsService } from '../../../services/api-request/google-flights.service';
import { OtherFlight, SearchParameters } from '../../../interfaces/google-flights-response.interface';
import { MapsComponent } from '../../maps/maps.component';
import { NotifyService } from '../../../shared/notify/notify.service';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    CommonModule,
    MapsComponent,
    FormsModule
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {

  notifyService = inject(NotifyService);
  service = inject(GoogleFlightsService);
  
  googleFlightsResponseList: OtherFlight []= [];

  // engine: string = 'google_flights';
  type: string = '1';
  departure_id: string = 'PEK';
  arrival_id: string = 'AUS';
  outbound_date: String = "2024-07-30";
  return_date?: String = "2024-08-06";

  constructor() {
    this.sendData();
  };

  sendData() {
    const datos: SearchParameters = {
      // engine: this.engine,
      departure_id: this.departure_id,
      arrival_id: this.arrival_id,
      outbound_date: this.outbound_date,
      return_date: this.return_date,
      type: this.type
    };

    this.service.getAllSignal(datos);

    effect(() => {
      
      this.googleFlightsResponseList = this.service.googleFlightsResponse$();
      console.log(this.googleFlightsResponseList);
    })
  };

  trackByIndex(index: number, googleFlightsResponseList: OtherFlight): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }



  openLayouts(): void {
    // if (url) {
    //   window.open(url,'_blank') ;
    // } else {
    //   this.notifyService.onNoData();
    // }
    console.log('implement layouts')
  };

}
