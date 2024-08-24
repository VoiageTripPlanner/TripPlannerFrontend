import { Component } from "@angular/core";
import { TripSummaryCardsComponent } from "../../components/trip-summary/trip-summary-cards.component";
import { Router } from "@angular/router";
import { PriceDetailsComponent } from "../../components/price-details/price-details.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "../../components/modal/modal.component";
import { TripInformationComponent } from "../../components/trip-information/trip-information.component";

@Component({
  selector: "app-trip-summary",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    PriceDetailsComponent,
    TripSummaryCardsComponent,
    TripInformationComponent,
  ],
  templateUrl: "./trip-summary.component.html",
  styleUrl: "./trip-summary.component.scss",
})
export class TripSummaryComponent {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigateByUrl("app/dashboard");
  }
}
