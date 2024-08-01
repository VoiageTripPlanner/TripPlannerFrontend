import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { NotifyService } from '../shared/notify/notify.service';
import { IVoiageActivities } from '../interfaces/activities.interface';


@Injectable({
  providedIn: 'root',
})
export class ActivitiesService extends BaseService<IVoiageActivities> {

  notifyService = inject(NotifyService);


  private activitiesListSignal = signal<IVoiageActivities[]>(this.onGetDefaultVoiageActivities());

  get activities$() {
    return this.activitiesListSignal;
  };


  onGetDefaultVoiageActivities() {

    return [
      {

    }

    ];

};


getAllActivities() {

  this.findAll().subscribe({
    next: (response: any) => {
      this.activitiesListSignal.set(response);
      response.reverse();
    },
    error: (error: any) => {
      console.error('Error fetching users', error);
      this.notifyService.onError();
    }
  });
};
}