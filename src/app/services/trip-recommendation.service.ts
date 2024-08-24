import { inject, Injectable, signal, Signal } from "@angular/core";
import { ITripRecommendation } from "../interfaces/trip-recommendation.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TripRecommendationService {
  private tripRecommendation = signal<ITripRecommendation | null>(null);
  private httpService: HttpClient = inject(HttpClient);

  public get tripRecommendationSig(): Signal<ITripRecommendation | null> {
    return this.tripRecommendation.asReadonly();
  }

  public getTripRecommendation(): void {
    this.httpService.get<any>("openai/tripRecommendation").subscribe({
      next: (response: any) => {
        const tripRecommendation: ITripRecommendation = JSON.parse(
          response.choices[0].message.content,
        );

        if (tripRecommendation) {
          this.tripRecommendation.set(tripRecommendation);
        } else {
          this.tripRecommendation.set(null);
        }
      },
      error: (error: any) => {
        console.error("Error fetching recommendations", error);
      },
    });
  }
}
