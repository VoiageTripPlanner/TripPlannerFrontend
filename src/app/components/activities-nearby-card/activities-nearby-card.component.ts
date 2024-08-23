import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { NgIf } from '@angular/common';
import { IGoogleResponse } from '../../interfaces/google-hotel-response.interface';
import { MapComponent } from '../map/map.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotifyService } from '../../shared/notify/notify.service';
import { BudgetService } from '../../services/budged.service';
import { Router } from '@angular/router';
import { IActivity } from '../../interfaces/activities.interface';
import { ActivityService } from '../../services/voiage-services/activity.service';

@Component({
  selector: 'app-activities-nearby-card',
  standalone: true,
  imports: [
    MatToolbarModule,
    NgIf,
    MapComponent],
  templateUrl: './activities-nearby-card.component.html',
  styleUrl: './activities-nearby-card.component.scss'
})
export class ActivitiesNearbyCardComponent implements OnInit {

  @Input() places: IPlaceSearchResult[] = [];
  @Output() onPlaceSelected = new EventEmitter<IPlaceSearchResult>();


  notifyService     = inject(NotifyService);
  budgetService     = inject(BudgetService);
  activityService   = inject(ActivityService);

  activitySelected:IActivity[];

  constructor(
    private router: Router,
  ) {
    this.onNearbyPlacesFound(this.places);
    this.activitySelected = this.activityService.onGetDefaultVoiageActivitiesList();
  }

  trackByIndex(index: number, places: IGoogleResponse): number {
    return index;
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '../../../../assets/img/No_image_available.png';
  }

  ngOnInit(): void {
    const storedNearbyPlaces = localStorage.getItem('nearbyPlaces');
    if (storedNearbyPlaces) {
      this.places = JSON.parse(storedNearbyPlaces);
      this.onNearbyPlacesFound(this.places);
    }
  }

  fromValue: IPlaceSearchResult = { address: '' };
  fromNearbyPlaces: IPlaceSearchResult[] = [];
  allNearbyPlaces: IPlaceSearchResult[] = [];
  zoomToPlace: IPlaceSearchResult = { address: '' };

  onNearbyPlacesFound(places: IPlaceSearchResult[]) {
    this.fromNearbyPlaces = places;
    this.allNearbyPlaces = [...this.fromNearbyPlaces];
  }

  viewInMap(place: IPlaceSearchResult) {
      this.zoomToPlace = place; 
  }

  ViewDestination(){
    const storedPlace = localStorage.getItem('destinationLocation');
    if (storedPlace) {
        this.fromValue = JSON.parse(storedPlace);
    }
  }

  visitSite(url: string | undefined): void {
      if (url) {
        window.open(url, '_blank');
      } else {
        this.notifyService.onNoData();
        }
  };

  checkboxChange(placeNearby: IPlaceSearchResult, event: any): void {

  const activitySelected=this.activityFilterInfo(placeNearby);

    if (event.target.checked) {
      this.activityService.addItem(activitySelected);  
      this.notifyService.onCustomSimpleNotify('Added to the list', 'The activity has been added to the list');

    } else {
      if (activitySelected.googleId) {

        this.activityService.removeItem(activitySelected.googleId);
        this.notifyService.onCustomSimpleNotify('Removed from the list', 'The restaurant has been removed of the list');
      }
    }
  }

  activityFilterInfo(placeNearby: IPlaceSearchResult): IActivity {

    const activityNearby: IActivity=this.activityService.onGetDefaultVoiageActivities();

    const lat = (placeNearby.location as any).lat;
    const lng = (placeNearby.location as any).lng;
    
    if (typeof lat === 'number' && typeof lng === 'number') {
      activityNearby.latitude = lat;
      activityNearby.longitude = lng;
    } else {
      activityNearby.latitude = 0;
      activityNearby.longitude = 0;
    }

    activityNearby.address      = placeNearby.address;
    activityNearby.imageUrl     = placeNearby.imageUrl;
    activityNearby.googleId     = placeNearby.id;
    activityNearby.name         = placeNearby.name;
    activityNearby.rating       = placeNearby.rating;
    activityNearby.website      = placeNearby.website;
    activityNearby.priceLevel   = placeNearby.pricelevel;
    activityNearby.iconUrl      = '';
    return activityNearby;
  }
}
