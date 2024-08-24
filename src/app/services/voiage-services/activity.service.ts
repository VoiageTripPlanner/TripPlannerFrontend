import { inject, Injectable, signal } from "@angular/core";
import { BaseService } from "../base-service";
import { NotifyService } from "../../shared/notify/notify.service";
import { IActivity } from "../../interfaces/activities.interface";

@Injectable({
  providedIn: "root",
})
export class ActivityService extends BaseService<IActivity> {
  private storageKey = "selectedActivities";
  notifyService = inject(NotifyService);

  private activitiesListSignal = signal<IActivity[]>(
    this.onGetDefaultVoiageActivitiesList(),
  );

  addItem(item: IActivity): void {
    const items = this.getActivities();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  removeItem(itemId: string): void {
    let items = this.getActivities();
    items = items.filter((item) => item.googleId !== itemId);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  getActivities(): IActivity[] {
    const storedItems = localStorage.getItem(this.storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  onGetDefaultVoiageActivities() {
    const defaultValue: IActivity = {
      address: "",
      googleId: "",
      name: "",
      location: undefined,
      imageUrl: "",
      latitude: 0,
      longitude: 0,
      rating: 0,
      priceLevel: 0,
      website: "",
    };
    return defaultValue;
  }

  onGetDefaultVoiageActivitiesList() {
    return [this.onGetDefaultVoiageActivities()];
  }
}
