import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IGoogleResponse, ISearchParameters } from '../../interfaces/google-hotel-response.interface';
import { IActivitiesBusiness, IYelpApiSearchParams } from '../../interfaces/yelp-activities-response.interface';
import { NotifyService } from '../../shared/notify/notify.service';

@Injectable({
  providedIn: 'root',
})
export class YelpActivitiesService extends BaseService<IActivitiesBusiness> {

  private notifyService = inject(NotifyService);
  
  protected override source: string = 'api/activities';

  private yelpActivitiesResponseSignal = signal<IActivitiesBusiness[]>([]);


  get yelpActivitiesResponse$() {
    return this.yelpActivitiesResponseSignal;
  }

  getAllSignal(searchParams: IYelpApiSearchParams) {
    this.bringInfoWithParams(searchParams).subscribe({
      next: (response: any) => {

        debugger
        if (!response || response.businesses.length==0) {

          this.yelpActivitiesResponseSignal.set([]);

          return this.notifyService.onNoData();
          
        }
        
        console.log(response.businesses);
        this.yelpActivitiesResponseSignal.set(response.businesses);


      },
      error: (error: any) => {
        
        console.error('Error fetching Yelp API with activities list', error);
      }
    });
  }

}
