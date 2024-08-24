import { Component, effect, inject, Signal } from "@angular/core";
import { TripService } from "../../services/trip.service";
import { ITrip } from "../../interfaces/trip.interface";
import { IPagination } from "../../interfaces/pagination.interface";
import { TripsTableComponent } from "../../components/trips-table/trips-table.component";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-trips-page",
  standalone: true,
  imports: [TripsTableComponent],
  templateUrl: "./trips-page.component.html",
  styleUrl: "./trips-page.component.scss",
})
export class TripsPageComponent {
  public tripPagination!: Signal<IPagination<ITrip> | null>;
  public isLoading: boolean = false;
  private tripService: TripService = inject(TripService);
  private router: Router = inject(Router);
  private userService: any = inject(UserService);
  private user: any;

  constructor() {
    this.tripPagination = this.tripService.tripsSig;
    effect(() => {
      this.user = this.userService.userSig();
      this.isLoading = false;
      if (this.user.id) {
        this.tripService.getTripsByUserAndPage(this.user.id, 0, 10);
      }
    });
  }

  public changePage(page: PageEvent): void {
    this.tripService.getTripsByUserAndPage(
      this.user.id,
      page.pageIndex,
      page.pageSize,
    );
    this.isLoading = true;
  }

  public goTo(trip: any): void {
    this.router.navigate([`/app/trip-info/${trip.id}`]);
  }
}
