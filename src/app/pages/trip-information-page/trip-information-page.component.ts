import { Component, effect, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ITrip } from '../../interfaces/trip.interface';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-information-page',
  standalone: true,
  imports: [MatIconModule, LoaderComponent, DatePipe, CurrencyPipe],
  templateUrl: './trip-information-page.component.html',
  styleUrl: './trip-information-page.component.scss'
})
export class TripInformationPageComponent {
  public tripSig!: Signal<ITrip|null>;
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private tripService: TripService = inject(TripService);

  constructor() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tripService.getTripById(params['id']);
      }
    });
    this.tripSig = this.tripService.tripByIdSig;
  }

  public goToTrips(): void {
    this.router.navigate(['/app/trip-list']);
  }
}
