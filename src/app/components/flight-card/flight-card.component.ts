import { Component, effect, inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleFlightsService } from '../../services/api-request/google-flights.service';
import { IGFlightsResponse, SearchParameters } from '../../interfaces/gFlights-Response';

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
  googleFlightsResponseList: IGFlightsResponse[] = []


  //Mas adelante estos datos van a venir del componente padre que va a ser el primer formulario
  engine: string = 'google_flights';
  hl?: string = 'EN';
  gl?: string = 'CR';
  type: string = '2';
  currency?: string = 'USD';
  departure_id: string = 'SJO';
  arrival_id: string = 'LNV';
  outbound_date: Date = new Date("2024-08-19");
  return_date?: Date; // Add return_date as an optional property
  result: any;

  constructor() {
    this.sendData();
  };

  sendData() {
    const datos: SearchParameters = {
      engine: this.engine,
      hl: this.hl,
      gl: this.gl,
      type: this.type,
      currency: this.currency,
      departure_id: this.departure_id,
      arrival_id: this.arrival_id,
      outbound_date: this.outbound_date,
      return_date: this.return_date
    };

      //Es necesario validar el type en front como se hizo en back para el return_date ¿Que opinan?
      // if (datos.type === '2') {
      //   if (!datos.return_date) {
      //     throw new Error('return_date is required when type is 2');
      //   }
      //   this.service.getAllSignal(datos);
      // } else if (datos.type === '1') {
      //   this.service.getAllSignal(datos);
      // } else {
      //   throw new Error('Invalid type value');
      // }

    this.service.getAllSignal(datos);

    effect(() => {
      
      this.googleFlightsResponseList = this.service.googleFlightsResponse$();
      console.log(this.googleFlightsResponseList);
    })
  };



  trackByIndex(index: number, googleFlightsResponseList: IGFlightsResponse): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

}
