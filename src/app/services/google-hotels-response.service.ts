import { Injectable, signal } from '@angular/core';
import { ILodge, ISearchParameters } from '../interfaces/lodge';
import { GoogleHotelsBaseService } from './google-hotels-base-service';

@Injectable({
  providedIn: 'root',
})
export class GoogleHotelsResponseService extends GoogleHotelsBaseService<ILodge> {



  private hotelsListSignal = signal<ILodge[]>([]);

  get hotels$() {
    return this.hotelsListSignal;
  };

  getAllHotelsSignal(searchParams:ISearchParameters) {
    this.findAllHotels(searchParams).subscribe({
      next: (response: any) => {
        debugger;
        this.hotelsListSignal.set(response);
        console.log(response);
        response.reverse();
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching users', error);
      }
    });
  };


}
