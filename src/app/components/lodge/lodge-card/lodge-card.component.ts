import { Component, effect, inject, NgModule } from "@angular/core";
import { MapComponent } from "../../map/map.component";
import { GoogleHotelService } from "../../../services/api-request/google-hotel.service";
import {
  IGoogleResponse,
  ISearchParameters,
} from "../../../interfaces/google-hotel-response.interface";
import { LoaderComponent } from "../../loader/loader.component";
import { ModalComponent } from "../../modal/modal.component";
import { CommonModule, DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NotifyService } from "../../../shared/notify/notify.service";
import { TripService } from "../../../services/voiage-services/trip.service";
import { ITripForm } from "../../../interfaces/trip.interface";
import { formatDateToYYYYMMDD } from "../../../shared/utils/date-formatter";
import { BudgetService } from "../../../services/budged.service";
import { BudgetBarComponent } from "../../budget-bar/budget-bar.component";
import { Router } from "@angular/router";
import { IBudgetPrices } from "../../../interfaces/budget.interface";
import { IVoiageLodge } from "../../../interfaces/lodge.interface";
import { LodgeService } from "../../../services/voiage-services/lodge.service";
import { MatStepperModule } from "@angular/material/stepper";
import { AuthService } from "../../../services/auth.service";
import { IPlaceSearchResult } from "../../../interfaces/placeSearch";

@Component({
  selector: "app-lodge-card",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    MapComponent,
    LoaderComponent,
    ModalComponent,
    MapComponent,
    DecimalPipe,
  ],
  templateUrl: "./lodge-card.component.html",
  styleUrl: "./lodge-card.component.scss",
})
export class LodgeCardComponent {
  authService = inject(AuthService);
  budgetService = inject(BudgetService);
  lodgeService = inject(LodgeService);
  notifyService = inject(NotifyService);
  service = inject(GoogleHotelService);
  tripFormService = inject(TripService);

  googleHotelResponseList: IGoogleResponse[] = [];
  initialForm: ITripForm;
  tripBudget: IBudgetPrices;
  isLoading: boolean = false;

  lodgeSelected: IVoiageLodge;

  userId: number;

  constructor(private router: Router) {
    this.lodgeSelected = this.lodgeService.onGetDefaultVoiageLodge();
    this.initialForm = this.tripFormService.getFormData();
    this.tripBudget = this.budgetService.getBudgetData();
    this.userId = this.authService.getUserId();
    this.sendData();
  }

  sendData() {
    this.isLoading = true;
    const data: ISearchParameters = {
      q: this.initialForm.q,
      check_in_date: formatDateToYYYYMMDD(this.initialForm.check_in_date),
      check_out_date: formatDateToYYYYMMDD(this.initialForm.check_out_date),
    };

    this.service.getAllSignal(data);

    effect(() => {
      this.googleHotelResponseList = this.service.googleHotelResponse$();
      if (this.googleHotelResponseList.length > 0) {
        this.isLoading = false;
      }
    });
  }

  trackByIndex(
    index: number,
    googleHotelResponseList: IGoogleResponse,
  ): number {
    return index;
  }

  generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  visitSite(url: string | undefined): void {
    if (url) {
      window.open(url, "_blank");
    } else {
      this.notifyService.onNoData();
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = "../../../../assets/img/No_image_available.png";
  }

  selectOption(googleLodge: IGoogleResponse) {
    let amount = googleLodge.total_rate?.extracted_lowest;

    if (!amount) {
      amount = 0;
    }

    const classification = "lodge";
    this.budgetService.updateSpending(amount, classification);

    this.lodgeSelected = this.lodgeFilterInfo(googleLodge);
    this.lodgeService.saveVoiageLodgeData(this.lodgeSelected);

    this.notifyService.onCustomSimpleNotify(
      "Lodge Selected",
      "Go to the next step",
    );
  }

  lodgeFilterInfo(googleLodge: IGoogleResponse): IVoiageLodge {
    this.lodgeSelected.lodgeName = googleLodge.name || "";
    this.lodgeSelected.description = googleLodge.description || "";
    this.lodgeSelected.checkIn = this.initialForm.check_in_date || new Date();
    this.lodgeSelected.checkOut = this.initialForm.check_out_date || new Date();
    this.lodgeSelected.nightPrice =
      googleLodge.rate_per_night?.extracted_lowest || 0;
    this.lodgeSelected.latitude = googleLodge.gps_coordinates?.latitude || 0;
    this.lodgeSelected.longitude = googleLodge.gps_coordinates?.longitude || 0;
    this.lodgeSelected.totalRate = googleLodge.overall_rating || 0;
    this.lodgeSelected.externalLink = googleLodge.link || "";
    this.lodgeSelected.images =
      googleLodge.images![0]?.original_image ||
      "./assets/img/No_image_available.png";
    this.lodgeSelected.type = googleLodge.type || "";
    this.lodgeSelected.amenities = googleLodge.amenities?.join(", ") || "";
    this.lodgeSelected.totalPrice =
      googleLodge.total_rate?.extracted_lowest || 0;
    this.lodgeSelected.creationResponsible = this.userId;
    this.lodgeSelected.creationDatetime = new Date();
    this.lodgeSelected.operational = true;

    return this.lodgeSelected;
  }

  zoomToLodge: IGoogleResponse = {};

  viewInMap(lodge: IGoogleResponse) {
    this.zoomToLodge = lodge;
  }

  fromValue: IPlaceSearchResult = { address: "" };

  ViewDestination() {
    const storedPlace = localStorage.getItem("destinationLocation");
    if (storedPlace) {
      this.fromValue = JSON.parse(storedPlace);
    }
  }
}
