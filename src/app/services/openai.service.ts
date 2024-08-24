import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { Observable, catchError, tap, throwError } from "rxjs";
import { ICountry } from "../interfaces/country.interface";
import { IVoiageRestaurant } from "../interfaces/food.interface";
import { LodgeService } from "./voiage-services/lodge.service";
import { FlightService } from "./voiage-services/flights.service";
import { FoodService } from "./voiage-services/food.service";
import { ActivityService } from "./voiage-services/activityService";
import { NotifyService } from "../shared/notify/notify.service";
import {
  IActivityEstimate,
  IAISuggestion,
} from "../interfaces/openai.interface";

@Injectable({
  providedIn: "root",
})
export class OpenAIService extends BaseService<IAISuggestion> {
  // lodgeService            = inject(LodgeService);
  // flightService           = inject(FlightService);
  // foodService             = inject(FoodService);
  // activitiesService       = inject(ActivityService);
  notifyService = inject(NotifyService);

  protected override source: string = "openai/priceEstimation";

  private openaiPriceEstimationSignal = signal<IAISuggestion>(
    this.onGetDefaultAISuggestion(),
  );

  get tripForm$() {
    return this.openaiPriceEstimationSignal;
  }

  onGetDefaultAISuggestion() {
    const defaultValue: IAISuggestion = {
      startDate: new Date("1900-01-01"),
      endDate: new Date("1900-01-01"),
      currency: "USD",
      totalEstimate: 0,
      destination: "",
      activityEstimates: [this.onGetDefaultActivityEstimate()],
    };

    return defaultValue;
  }

  onGetDefaultActivityEstimate() {
    const defaultValue: IActivityEstimate = {
      name: "",
      address: "",
      location: "",
      priceEstimate: 0,
    };

    return defaultValue;
  }

  setInitialForm(data: IAISuggestion) {
    this.openaiPriceEstimationSignal.set(data);
  }

  getPriceSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.openaiPriceEstimationSignal.set(response);
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
      },
    });
  }

  getPriceEstimate(priceRequest: IAISuggestion): Observable<IAISuggestion> {
    return this.http.post<IAISuggestion>(this.source, priceRequest).pipe(
      catchError((error: any) => {
        console.error("Error fetching users", error);
        this.notifyService.onError();
        return throwError(error);
      }),
    );
  }
}
