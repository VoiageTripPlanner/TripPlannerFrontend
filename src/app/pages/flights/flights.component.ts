import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LodgeCardComponent } from '../../components/lodge/lodge-card/lodge-card.component';
import { MapComponent } from '../../components/map/map.component';
import { FlightCardComponent } from "../../components/flight/flight-card/flight-card.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    LodgeCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    CommonModule,
    FormsModule,
    FlightCardComponent
],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'

})
export class FlightsComponent {

}
