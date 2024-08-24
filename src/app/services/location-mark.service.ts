import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { NotifyService } from "../shared/notify/notify.service";
import { ILocationMark } from "../interfaces/location-mark.interface";

@Injectable({
  providedIn: "root",
})
export class LocationMarkService extends BaseService<ILocationMark> {
  notifyService = inject(NotifyService);

  private restaurantListSignal = signal<ILocationMark>(
    this.onGetDefaultVoiageLocationMark(),
  );

  get restaurant$() {
    return this.restaurantListSignal;
  }

  onGetDefaultVoiageLocationMark() {
    const defaultValue: ILocationMark = {
      mark_id: 0,
      latitude: 0,
      longitude: 0,
      address: "",
      place_id: 0,
      user_id: 0,
    };

    return defaultValue;
  }

  getAllRestauranSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.restaurantListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
        this.notifyService.onError();
      },
    });
  }
}
