import { inject, Injectable, signal } from "@angular/core";
import {
  IAutoComplete,
  IAutoCompleteLocation,
} from "../interfaces/auto-complete.interface";
import { BaseService } from "./base-service";
import { NotifyService } from "../shared/notify/notify.service";

@Injectable({
  providedIn: "root",
})
export class AutoCompleteService extends BaseService<IAutoComplete> {
  notifyService = inject(NotifyService);

  private autoCompleteSignal = signal<IAutoComplete>(
    this.onGetDefaultAutoComplete(),
  );

  private storageKey = "destinationLocation";

  get autoComplete$() {
    return this.autoCompleteSignal;
  }

  onGetDefaultLocation() {
    const defaultValue: IAutoCompleteLocation = {
      lat: 0,
      lng: 0,
    };

    return defaultValue;
  }

  onGetDefaultAutoComplete() {
    const defaultValue: IAutoComplete = {
      address: "",
      name: "",
      id: "",
      location: this.onGetDefaultLocation(),
      imageUrl: "",
      rating: 0,
      website: "",
    };

    return defaultValue;
  }

  saveAutoCompleteData(formData: IAutoComplete): void {
    localStorage.setItem(this.storageKey, JSON.stringify(formData));
  }

  getAutocompleteData(): IAutoComplete {
    const formDataString = localStorage.getItem(this.storageKey);
    if (formDataString) {
      const formData = JSON.parse(formDataString);
      return formData;
    } else {
      return this.onGetDefaultAutoComplete();
    }
  }
}
