import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IPlaceSearchResult } from "../interfaces/placeSearch";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
  })

  export class GoogleService extends BaseService <IPlaceSearchResult> {

    protected override source: string = 'ai';
    private placeListSignal = signal<IPlaceSearchResult[]>([]);
    get places$() {
      return this.placeListSignal;
    };


   public getPlaceRecomendations(place: IPlaceSearchResult){
        return this.http.post<IPlaceSearchResult>('ai', place);
   }

  }