import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from '../base-service';
import { NotifyService } from '../../shared/notify/notify.service';
import { IActivity } from '../../interfaces/activities.interface';

@Injectable({
    providedIn: 'root',
  })

  export class ActivityService extends BaseService<IActivity> {
   
    private storageKey = 'selectedActivities';
    notifyService = inject(NotifyService);


    private activitiesListSignal = signal<IActivity[]>(this.onGetDefaultVoiageActivities());
  
    addItem(item: IActivity): void {
      const items = this.getActivities();
      items.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  
    removeItem(itemId: string): void {
      let items = this.getActivities();
      items = items.filter(item => item.id !== itemId);
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  
    getActivities(): IActivity[] {
      const storedItems = localStorage.getItem(this.storageKey);
      return storedItems ? JSON.parse(storedItems) : [];
    }

    onGetDefaultVoiageActivities() {

      return [
        {
          address: '',
          id: '',
          name: '',
          location: undefined,
          imageUrl: '',
          latitude: 0,
          longitude: 0,
          rating: 0,
          pricelevel: 0,
          website: ''
      }
      ];  
  };

    }