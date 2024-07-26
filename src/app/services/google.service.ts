import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IPlaceSearchResult } from "../interfaces/placeSearch";

@Injectable({
    providedIn: 'root',
  })

  export class GoogleService extends BaseService <IPlaceSearchResult> {

    protected override source: string = 'placeSearch';
    private placeListSignal = signal<IPlaceSearchResult[]>([]);
    get places$() {
      return this.placeListSignal;
    };

    


  }