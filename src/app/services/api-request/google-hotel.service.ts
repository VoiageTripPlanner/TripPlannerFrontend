import { Injectable, signal } from "@angular/core";
import { BaseService } from "../base-service";
import { Observable, catchError, tap, throwError } from "rxjs";
import {
  IGoogleResponse,
  ISearchParameters,
} from "../../interfaces/google-hotel-response.interface";

@Injectable({
  providedIn: "root",
})
export class GoogleHotelService extends BaseService<IGoogleResponse> {
  protected override source: string = "api/hotels";

  private googleHotelResponseSignal = signal<IGoogleResponse[]>([]);

  get googleHotelResponse$() {
    return this.googleHotelResponseSignal;
  }

  getAllSignal(searchParams: ISearchParameters) {
    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {
        this.googleHotelResponseSignal.set(response.properties);
      },
      error: (error: any) => {
        console.error("Error fetching Google Hotels list", error);
      },
    });
  }
}
