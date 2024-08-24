import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IPlaceSearchResult } from "../interfaces/placeSearch";

@Injectable({
  providedIn: "root",
})
export class MapsService extends BaseService<IPlaceSearchResult> {
  protected override source: string = "budget";
  private budgetSignal = signal<IPlaceSearchResult>(
    this.onGetDefaultSearchResult(),
  );

  get budget$() {
    return this.budgetSignal;
  }

  onGetDefaultSearchResult() {
    const defaultValue: IPlaceSearchResult = {
      address: "",
    };

    return defaultValue;
  }

  onGetDefaultSearchResultList() {
    return [this.onGetDefaultSearchResult()];
  }
}
