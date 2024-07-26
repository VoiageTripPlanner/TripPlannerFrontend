import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { ISearchParameters } from '../../interfaces/gFlights-response.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GFlightsS0ervice } from '../../services/api-request/gFlights.service';
import { LodgeCardComponent } from '../../components/lodge/lodge-card/lodge-card.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-flights',

  service = inject(GFlightsService);

  destino: string = 'Tokyo';
  checkIn: Date = new Date('2024-08-07');
  checkOut: Date = new Date('2024-08-14');
  resultado: any;

}
