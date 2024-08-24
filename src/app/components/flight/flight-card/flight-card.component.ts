import { Component, effect, EventEmitter, inject, Output } from "@angular/core";
import { LoaderComponent } from "../../loader/loader.component";
import { ModalComponent } from "../../modal/modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GoogleFlightsService } from "../../../services/api-request/google-flights.service";
import {
  OtherFlight,
  SearchParameters,
} from "../../../interfaces/google-flights-response.interface";
import { MapComponent } from "../../map/map.component";
import { NotifyService } from "../../../shared/notify/notify.service";
import { ITripForm } from "../../../interfaces/trip.interface";
import { IBudgetPrices } from "../../../interfaces/budget.interface";
import { BudgetService } from "../../../services/budged.service";
import { TripService } from "../../../services/voiage-services/trip.service";
import { Router } from "@angular/router";
import {
  formatDateToYYYYMMDD,
  formatStringToDate,
} from "../../../shared/utils/date-formatter";
import { Airport, IVoiageFlight } from "../../../interfaces/flights.interface";
import { MatStepperModule } from "@angular/material/stepper";
import { FlightService } from "../../../services/voiage-services/flights.service";

@Component({
  selector: "app-flight-card",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    LoaderComponent,
    ModalComponent,
    MapComponent,
  ],
  templateUrl: "./flight-card.component.html",
  styleUrl: "./flight-card.component.scss",
})
export class FlightCardComponent {
  budgetService = inject(BudgetService);
  notifyService = inject(NotifyService);
  service = inject(GoogleFlightsService);
  tripFormService = inject(TripService);
  flightService = inject(FlightService);

  initialForm: ITripForm;
  tripBudget: IBudgetPrices;
  isLoading: boolean = false;

  flightSelected: IVoiageFlight;
  flightDepartureAirport: Airport;
  flightArrivalAirport: Airport;
  googleFlightsResponseList: OtherFlight[] = [];

  constructor(private router: Router) {
    this.flightSelected = this.flightService.onGetDefaultVoiageFlight();
    this.flightDepartureAirport = this.flightService.onGetDefaultAirports();
    this.flightArrivalAirport = this.flightService.onGetDefaultAirports();

    this.initialForm = this.tripFormService.getFormData();
    this.tripBudget = this.budgetService.getBudgetData();

    this.sendData();
  }

  sendData() {
    this.isLoading = true;

    const datos: SearchParameters = {
      departure_id: this.initialForm.departure_id,
      arrival_id: this.initialForm.arrival_id,
      outbound_date: formatDateToYYYYMMDD(this.initialForm.outbound_date),
      return_date: formatDateToYYYYMMDD(
        this.initialForm.return_date
          ? this.initialForm.return_date
          : new Date(),
      ),
      type: this.initialForm.type.toString(),
      travel_class: this.initialForm.travel_class ?? 1,
      stops: this.initialForm.stops ?? 0,
    };

    // Validar 'type'
    if (datos.type !== "1" && datos.type !== "2") {
      return;
    }

    this.service.getAllSignal(datos);

    effect(() => {
      this.googleFlightsResponseList = this.service.googleFlightsResponse$();
      if (this.googleFlightsResponseList.length > 0) {
        this.isLoading = false;
      } else if ((this.googleFlightsResponseList.length = 0)) {
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
      window.open(url, "_blank");
    } else {
      this.notifyService.onNoData();
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = "../../../../assets/img/No_image_available.png";
  }

  openLayouts(): void {}

  selectOption(googleFlight: OtherFlight): void {
    let amount = googleFlight.price;

    if (!amount) {
      amount = 0;
    }

    const classification = "flights";

    this.budgetService.updateSpending(amount, classification);
    this.flightSelected = this.flghtFilterInfo(googleFlight);
    this.flightService.saveVoiageFlightData(this.flightSelected);
    this.notifyService.onCustomSimpleNotify(
      "Flight Selected",
      "Go to the next step",
    );
  }

  flghtFilterInfo(googleFlight: OtherFlight): IVoiageFlight {
    this.airportFlightSelected(googleFlight);

    this.flightSelected.departure_airport = this.flightDepartureAirport;
    this.flightSelected.arrival_airport = this.flightArrivalAirport;
    this.flightSelected.airline = googleFlight.flights![0].airline || " ";
    this.flightSelected.airline_logo =
      googleFlight.flights![0].airline_logo ||
      "./assets/img/No_image_available.png";
    this.flightSelected.travel_class =
      googleFlight.flights![0].travel_class || " ";
    this.flightSelected.flight_number =
      googleFlight.flights![0].flight_number || " ";

    //Las fechas son sacadas del fomulario de busqueda
    this.flightSelected.start_date =
      this.initialForm.outbound_date || new Date();
    this.flightSelected.end_date = this.initialForm.return_date || new Date(); // Ver si hay que responder una fecha volada para que en el back se agarre y no se guarde essa fecha

    this.flightSelected.booking_token = googleFlight.booking_token || ""; //A esta no le veo mucha utilidad guardarla
    this.flightSelected.price = Number(googleFlight.price) || 0;
    this.flightSelected.type = googleFlight.type || " ";
    // this.flightSelected.is_layover                      =
    this.flightSelected.duration = googleFlight.total_duration || 0;
    this.flightSelected.booking_token = googleFlight.booking_token || " ";
    this.flightSelected.total_duration = googleFlight.total_duration || 0;

    return this.flightSelected;
  }

  airportFlightSelected(googleFlight: OtherFlight): void {
    this.flightDepartureAirport.name =
      googleFlight.flights![0].departure_airport?.name || " ";
    this.flightDepartureAirport.id =
      googleFlight.flights![0].departure_airport?.id || " ";
    this.flightDepartureAirport.time =
      googleFlight.flights![0].departure_airport?.time || " ";

    this.flightArrivalAirport.name =
      googleFlight.flights![0].arrival_airport?.name || " ";
    this.flightArrivalAirport.id =
      googleFlight.flights![0].arrival_airport?.id || " ";
    this.flightArrivalAirport.time =
      googleFlight.flights![0].arrival_airport?.time || " ";
  }
}
