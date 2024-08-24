import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "../base-service";
import { NotifyService } from "../../shared/notify/notify.service";
import { IVoiageLodge } from "../../interfaces/lodge.interface";

@Injectable({
  providedIn: "root",
})
export class LodgeService extends BaseService<IVoiageLodge> {
  notifyService = inject(NotifyService);

  private lodgeListSignal = signal<IVoiageLodge>(
    this.onGetDefaultVoiageLodge(),
  );

  private storageKey = "lodge";

  get lodge$() {
    return this.lodgeListSignal;
  }

  onGetDefaultVoiageLodge() {
    const getNextDay = (): Date => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 3));
    };

    const defaultValue: IVoiageLodge = {
      lodgeName: "",
      description: "",
      checkIn: getNextDay(),
      checkOut: getNextDay(),
      nightPrice: 0,
      latitude: 0,
      longitude: 0,
      totalRate: 0,
      type: "",
      operational: true,
      totalPrice: 0,
      creationDatetime: new Date(),
      creationResponsible: 0,
      lastUpdateDatetime: new Date("1900-01-01"),
      updateResponsible: 0,
    };

    return defaultValue;
  }

  getAllLodgeSignal() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.lodgeListSignal.set(response);
        response.reverse();
      },
      error: (error: any) => {
        console.error("Error fetching users", error);
        this.notifyService.onError();
      },
    });
  }

  saveVoiageLodgeData(formData: IVoiageLodge): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getLodgeData(): IVoiageLodge {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {
      const formData = JSON.parse(formDataString);

      return formData;
    } else {
      return this.onGetDefaultVoiageLodge();
    }
  }
}
