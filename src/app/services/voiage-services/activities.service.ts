import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { NotifyService } from '../../shared/notify/notify.service';
import { IActivity } from '../../interfaces/activities.interface';



@Injectable({
  providedIn: 'root',
})
export class ActivitiesService extends BaseService<IActivity> {

  notifyService = inject(NotifyService);


  private activitiesListSignal = signal<IActivity[]>(this.onGetDefaultVoiageActivities());

  get activities$() {
    return this.activitiesListSignal;
  };


  onGetDefaultVoiageActivities(): IActivity[] {
    return [
      {
        id: "1",
        name: 'Activity 1',
        address: '123 Main St'
        // Add other properties as needed
      },
      {
        id: "2",
        name: 'Activity 2',
        address: '456 Elm St'
        // Add other properties as needed
      }
    ];
  }


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