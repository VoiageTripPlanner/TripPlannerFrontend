import { Component, effect, inject } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleFlightsService } from '../../../services/api-request/google-flights.service';
import { OtherFlight, SearchParameters } from '../../../interfaces/google-flights-response.interface';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  service = inject(GoogleFlightsService);
  googleFlightsResponseList: OtherFlight = {};

  engine: string = 'google_flights';
  type: string = '2';
  departure_id: string = 'SJO';
  arrival_id: string = 'LNV';
  outbound_date: Date = new Date("2024-08-19");
  return_date?: Date;

  constructor() {
    this.sendData();
  };

  sendData() {
    const datos: SearchParameters = {
      engine: this.engine,
      type: this.type,
      departure_id: this.departure_id,
      arrival_id: this.arrival_id,
      outbound_date: this.outbound_date,
      return_date: this.return_date
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

}
