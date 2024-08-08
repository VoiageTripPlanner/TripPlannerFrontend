import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LodgeCardComponent } from '../../components/lodge/lodge-card/lodge-card.component';
import { MapComponent } from '../../components/map/map.component';
import { FlightCardComponent } from "../../components/flight/flight-card/flight-card.component";
import { Router } from '@angular/router';
import { BudgetBarComponent } from '../../components/budget-bar/budget-bar.component';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    BudgetBarComponent,
    ModalComponent,
    LodgeCardComponent,
    MapComponent,
    LoaderComponent,
    FlightCardComponent
],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'

})
export class FlightsComponent {

  constructor(
    private router: Router, 
  ){

  }

  navigateToDashboard() {
    this.router.navigateByUrl('app/dashboard')
  }

}
