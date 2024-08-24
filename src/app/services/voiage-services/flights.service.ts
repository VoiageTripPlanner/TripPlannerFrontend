import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "../base-service";
import {
  Airport,
  IFlights,
  IVoiageFlight,
} from "../../interfaces/flights.interface";
import { NotifyService } from "../../shared/notify/notify.service";

@Injectable({
  providedIn: "root",
})
export class FlightService extends BaseService<IVoiageFlight> {
  notifyService = inject(NotifyService);

  private flightsListSignal = signal<IVoiageFlight>(
    this.onGetDefaultVoiageFlight(),
  );

  private storageKey = "flight";

  get flights$() {
    return this.flightsListSignal;
  }

  onGetDefaultVoiageFlight() {
    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue: IVoiageFlight = {
      flight_id: 0,
      departure_airport: this.onGetDefaultAirports(),
      arrival_airport: this.onGetDefaultAirports(),
      return_date: new Date("1900-01-01"),
      airline: "",
      airline_logo: "",
      travel_class: "",
      flight_number: "",
      start_date: getNextDay(),
      end_date: getNextDay(),
      booking_token: "",
      price: 0,
      type: "",
      isLayover: false,
      duration: 0,
      outbound_date: getNextDay(),
      google_flights_link: "",
      total_duration: 0,
      layovers: this.onGetDefaultLayoversList(),
      created_at: new Date(),
    };

    return defaultValue;
  }

  onGetDefaultLayover() {
    const defaultLayover: IFlights = {
      duration: 0,
      airline: "",
      airline_logo: "",
      travel_class: "",
      flight_number: "",
      return_date: new Date("1900-01-01"),
      outbound_date: new Date("1900-01-01"),
      created_at: new Date(),
      booking_token: "",
      google_flights_link: "",
      isLayover: false,
      total_duration: 0,
      price: 0,
      type: "",
      departure_airport: this.onGetDefaultAirports(),
      arrival_airport: this.onGetDefaultAirports(),
    };

    return defaultLayover;
  }

  onGetDefaultLayoversList() {
    return [this.onGetDefaultLayover()];
  }

  onGetDefaultAirports() {
    const defaultValue: Airport = {
      name: "",
      id: "",
      time: "",
    };

    return defaultValue;
  }

  getAllFlightsSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.flightsListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
        this.notifyService.onError();
      },
    });
  }

  saveVoiageFlightData(formData: IVoiageFlight): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getFlightData(): IVoiageFlight {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {
      const formData = JSON.parse(formDataString);
      return formData;
    } else {
      return this.onGetDefaultVoiageFlight();
    }
  }
}
