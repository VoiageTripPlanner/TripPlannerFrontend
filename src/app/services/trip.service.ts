import { Injectable, Signal, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ITrip } from '../interfaces/trip.interface';
import { IPagination } from '../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class TripService extends BaseService<ITrip> {
  protected override source: string = 'trip';
  private tripListSig = signal<IPagination<ITrip>|null>(null);
  private tripSignal = signal<ITrip|null>(null);

  public get tripsSig(): Signal<IPagination<ITrip>|null> {
    return this.tripListSig.asReadonly();
  }

  public get tripByIdSig(): Signal<ITrip|null> {
    return this.tripSignal.asReadonly();
  }

  public getTripsByUserAndPage(userId: number, page: number, size: number): void {
    this.findAllByUserAndPage(userId, page, size).subscribe({
      next: (response: any) => {
        this.tripListSig.set(response);
      },
      error: () => {
        this.tripListSig.set(null);
      }
    });
  }

  public getTripById(id: number): void {
    this.find(id).subscribe({
      next: (response: any) => {
        this.tripSignal.set(response);
      },
      error: () => {
        this.tripSignal.set(null);
      }
    });
  }

}
