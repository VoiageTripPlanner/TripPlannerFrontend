import { Injectable, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IPlaceSearchResult } from "../interfaces/placeSearch";
import { catchError, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IResponse } from "../interfaces/index.interface";

@Injectable({
    providedIn: 'root',
  })

  export class GoogleService extends BaseService<IPlaceSearchResult> {
    protected override source: string = 'openai';

    //Revive la respuesta de la API desde
    public getPlaceSuggestions (input: string): Observable<any> {
      return this.get(input).pipe(
        tap((response: any) => {
          console.log(response);
        }),
        catchError(error => {
          console.error('Error fetching Google Places', error);
          return throwError(error);
        })
      );
    };

  }