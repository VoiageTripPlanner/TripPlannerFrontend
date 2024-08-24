import { Component, inject, Signal, ViewChild } from "@angular/core";
import { ITripRecommendation } from "../../interfaces/trip-recommendation.interface";
import { TripRecommendationService } from "../../services/trip-recommendation.service";
import { StatisticsService } from "../../services/statistics.service";
import { NgIf } from "@angular/common";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-trip-recommendation",
  standalone: true,
  imports: [NgIf, ModalComponent],
  templateUrl: "./trip-recommendation.component.html",
  styleUrl: "./trip-recommendation.component.scss",
})
export class TripRecommendationComponent {
  public tripRecommendation!: Signal<ITripRecommendation | null>;
  public countryFlags!: { [key: string]: [value: string] };
  private tripRecommendationService: TripRecommendationService = inject(
    TripRecommendationService,
  );
  private statisticsService: StatisticsService = inject(StatisticsService);
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor() {
    this.getCountryFlagCodes();
    this.tripRecommendation =
      this.tripRecommendationService.tripRecommendationSig;
  }

  public getCountryFlag(country: string): string {
    const entries = Object.entries(this.countryFlags).find(
      ([key, value]) => String(value) === country,
    );
    if (entries) {
      return entries[0];
    }
    return "";
  }

  public openModal(event: any): void {
    event.preventDefault();
    this.modal.show();
  }

  private getCountryFlagCodes(): void {
    this.statisticsService.getCountryFlagCodeJson().subscribe((flagCodes) => {
      this.countryFlags = flagCodes;
    });
  }
}
