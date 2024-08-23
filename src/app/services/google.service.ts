import { Injectable, input, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { IOpenAIResponse, IPlaceSearchResult } from "../interfaces/placeSearch";
import { catchError, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IResponse } from "../interfaces/index.interface";

@Injectable({
    providedIn: 'root',
  })

  export class GoogleService extends BaseService<IPlaceSearchResult> {
    protected override source: string = 'openai';

    private suggestionsResponseSignal = signal<IOpenAIResponse>({content: ''});

    get suggestionsResponseSignal$() {
      return this.suggestionsResponseSignal;
    }

    //Revive la respuesta de la API desde
    public getPlaceSuggestions (input: string) {
      this.getSuggestions(input).subscribe({
        next: (response: any) => {
          
          console.log(response.choices[0].message.content);

          const data : string = response.choices[0].message.content;

          this.suggestionsResponseSignal.set({content : data});
        },
        error: (error: any) => {
          console.error('Error fetching Travel suggestions', error);
        }
       });
    };

  }