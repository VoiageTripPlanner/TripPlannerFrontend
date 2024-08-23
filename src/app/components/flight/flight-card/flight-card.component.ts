import { Component, effect, inject, OnInit} from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleFlightsService } from '../../../services/api-request/google-flights.service';
import { OtherFlight, SearchParameters, Layover, SearchMetadata } from '../../../interfaces/google-flights-response.interface';
import { MapComponent } from '../../map/map.component';
import { NotifyService } from '../../../shared/notify/notify.service';
import { ITripForm } from '../../../interfaces/trip.interface';
import { IBudgetPrices } from '../../../interfaces/budget.interface';
import { BudgetService } from '../../../services/budged.service';
import { TripService } from '../../../services/voiage-services/trip.service';
import { Router } from '@angular/router';
import { formatDateToYYYYMMDD} from '../../../shared/utils/date-formatter';
import { Airport, IVoiageFlight } from '../../../interfaces/flights.interface';
import { MatStepperModule } from '@angular/material/stepper';
import { FlightService } from '../../../services/voiage-services/flights.service';


@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    LoaderComponent,
    ModalComponent,
    MapComponent,
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent implements OnInit {

  budgetService = inject(BudgetService);
  notifyService = inject(NotifyService);
  service = inject(GoogleFlightsService);
  tripFormService = inject(TripService);
  flightService=inject(FlightService);
  initialForm: ITripForm;
  tripBudget: IBudgetPrices;
  isLoading: boolean = false;
  flightSelected: IVoiageFlight;
  flightDepartureAirport: Airport;
  flightArrivalAirport: Airport;

  googleFlightsResponseList: OtherFlight[] = [];
  googleFlightsResponseMetadata: SearchMetadata = {};
  layovers: IVoiageFlight[] = [];

  constructor(
    private router: Router,
  ) {

    this.flightSelected = this.flightService.onGetDefaultVoiageFlight();
    this.flightDepartureAirport=this.flightService.onGetDefaultAirports();
    this.flightArrivalAirport=this.flightService.onGetDefaultAirports();
    this.initialForm = this.tripFormService.getFormData();
    this.tripBudget = this.budgetService.getBudgetData();

    this.sendData();
  }ngOnInit(): void {

  };

  removeCircularReferences<T>(obj: T, seen: WeakSet<any> = new WeakSet()): T | undefined {
    if (obj && typeof obj === 'object') {
        if (seen.has(obj)) {
            return undefined;
        }
        seen.add(obj);
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                (obj as any)[key] = this.removeCircularReferences((obj as any)[key], seen);
            }
        }
    }
    return obj;
}

  sendData() {
    this.isLoading = true;

    const datos: SearchParameters = {
      departure_id: this.initialForm.departure_id,
      arrival_id: this.initialForm.arrival_id,
      outbound_date: formatDateToYYYYMMDD(this.initialForm.outbound_date),
      return_date: formatDateToYYYYMMDD(this.initialForm.return_date ? this.initialForm.return_date : new Date()),
      type: this.initialForm.type.toString(),
      travel_class: this.initialForm.travel_class ?? 1,
      stops: this.initialForm.stops ?? 0
    };

    if (datos.type !== '1' && datos.type !== '2') {
      return;
    }

    this.service.getAllSignal(datos);

    effect(() => {
      this.googleFlightsResponseList = this.service.googleFlightsResponse$();
      if (this.googleFlightsResponseList.length > 0) {
        this.isLoading = false;
        this.layovers = this.googleFlightsResponseList.map(flight => this.flightFilterInfo(flight));
        this.layovers.forEach(layover => layover.showLayovers = false);
      } else if (this.googleFlightsResponseList.length === 0) {
        this.isLoading = false;
        this.notifyService.onError();
      }
    });
  }

  trackByIndex(index: number, googleFlightsResponseList: OtherFlight): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  visitSite(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    } else {
      this.notifyService.onNoData();
    }
  };

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  }

  openLayouts(): void {

  };

  selectOption(googleFlight: OtherFlight): void {
    let amount = googleFlight.price;
  
    if (!amount) {
      amount = 0;
    }
    const classification = 'flights';
    this.budgetService.updateSpending(amount, classification);
    this.flightSelected=this.flightFilterInfo(googleFlight);
    this.isLayoverOrNot(googleFlight);
    const sanitizedFlight = this.removeCircularReferences<IVoiageFlight>(this.flightSelected);
    if (sanitizedFlight) {
      this.flightService.saveVoiageFlightData(sanitizedFlight);
      this.notifyService.onCustomSimpleNotify('Flight Selected','Go to the next step', );
    }else{ 
      console.error('Circular reference detected in googleFlight object');
      this.notifyService.onError();
    }
  }

  isLayoverOrNot(layover: OtherFlight): boolean {
    if (!layover.flights || layover.flights.length === 0) {
      this.flightSelected.isLayover = false;
      return this.flightSelected.isLayover;
    }

    // const departureAirport = layover.flights[0].name && layover.flights[0].id;
    // const arrivalAirport = layover.flights[layover.flights.length - 1].name;

    // if (
    //   (layover.name === this.initialForm.departure_id && layover.id === departureAirport.id) ||
    //   (layover.name === this.initialForm.arrival_id && layover.id === arrivalAirport.id)
    // ) {
    //     this.flightSelected.isLayover = true;
    //     this.layovers.push(this.flightSelected.layovers![0]);
    //     //**********************delete*****************************//
    //     console.log('Layover', this.layovers);
    // } else {
    //     this.flightSelected.isLayover = false;
    // }
    console.log('Layover', this.flightSelected.isLayover);
    console.log('Layover', this.layovers);
    return this.flightSelected.isLayover;
  }

  flightFilterInfo( googleFlight: OtherFlight): IVoiageFlight {
    this.flightSelected.duration                        = googleFlight.total_duration || 0;
    this.flightSelected.airline_name                    = googleFlight.flights![0].airline || " ";
    this.flightSelected.airline_logo                    = googleFlight.flights![0].airline_logo || "./assets/img/No_image_available.png";
    this.flightSelected.travel_class                    = googleFlight.flights![0].travel_class || " ";
    this.flightSelected.flight_number                   = googleFlight.flights![0].flight_number || " ";
    this.flightSelected.start_date                      = this.initialForm.outbound_date || new Date();
    this.flightSelected.end_date                        = this.initialForm.return_date || new Date(); 
    this.flightSelected.created_at                      = new Date();
    this.flightSelected.booking_token                   = googleFlight.booking_token || " ";
    this.flightSelected.isLayover                      = this.flightSelected.isLayover || false;
    this.flightSelected.total_duration                        = googleFlight.total_duration || 0;
    this.flightSelected.price                           = Number(googleFlight.price) || 0;
    this.flightSelected.type                            = googleFlight.type || " ";
    this.flightSelected.departure_airport               = this.flightDepartureAirport;
    this.flightSelected.arrival_airport                 = this.flightArrivalAirport;
    this.flightSelected.layovers                        = this.layovers;
    this.flightSelected.parentFlight                    = undefined;
    this.flightSelected.showLayovers                    = false;
    
    return this.flightSelected;
  };

  airportFlightSelected(googleFlight: OtherFlight): void {
    this.flightDepartureAirport.name          = googleFlight.flights![0].departure_airport?.name || " ";
    this.flightDepartureAirport.id            = googleFlight.flights![0].departure_airport?.id || " ";
    this.flightDepartureAirport.time          = googleFlight.flights![0].departure_airport?.time || " ";
    this.flightArrivalAirport.name            = googleFlight.flights![0].arrival_airport?.name || " ";
    this.flightArrivalAirport.id              = googleFlight.flights![0].arrival_airport?.id || " ";
    this.flightArrivalAirport.time            = googleFlight.flights![0].arrival_airport?.time || " ";
  }
}
