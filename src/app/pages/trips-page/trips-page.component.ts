import { Component, effect, inject, Signal } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { ITrip } from '../../interfaces/trip.interface';
import { IPagination } from '../../interfaces/pagination.interface';
import { TripsTableComponent } from '../../components/trips-table/trips-table.component';
import { PageEvent } from '@angular/material/paginator';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips-page',
  standalone: true,
  imports: [TripsTableComponent],
  templateUrl: './trips-page.component.html',
  styleUrl: './trips-page.component.scss'
})
export class TripsPageComponent {
  public tripPagination!: IPagination<ITrip>|null;
  public isLoading: boolean = false;
  private tripService: TripService = inject(TripService);
  private router: Router = inject(Router);

  constructor() {
    this.tripService.getTripsByUserAndPage(1, 0, 10);
    effect(() => {
      this.tripPagination = this.tripService.tripsSig();
      this.isLoading = false;
    });
  }

  public changePage(page: PageEvent): void {
    this.tripService.getTripsByUserAndPage(1, page.pageIndex, page.pageSize);
    this.isLoading = true;
  }

  public goTo(trip: any): void {
    this.router.navigate([`/app/trip-info/${trip.id}`]);
  }
}
