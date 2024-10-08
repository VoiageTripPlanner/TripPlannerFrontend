import { Component, inject, OnInit } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LodgeCardComponent } from "../../components/lodge/lodge-card/lodge-card.component";
import { MapComponent } from "../../components/map/map.component";
import { ITripForm } from "../../interfaces/trip.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { TripService } from "../../services/voiage-services/trip.service";
import { BudgetBarComponent } from "../../components/budget-bar/budget-bar.component";
import { MatStepperModule } from "@angular/material/stepper";

@Component({
  selector: "app-lodge",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    LodgeCardComponent,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    BudgetBarComponent,
  ],
  templateUrl: "./lodge.component.html",
  styleUrl: "./lodge.component.scss",
})
export class LodgeComponent {
  tripFormService = inject(TripService);

  initialForm: ITripForm;

  constructor(private router: Router) {
    this.initialForm = this.tripFormService.tripForm$();
  }

  navigateToDashboard() {
    this.router.navigateByUrl("app/dashboard");
  }
}
