import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';
import { CommonModule, NgIf } from '@angular/common';
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


  notifyService = inject(NotifyService);
  budgetService = inject(BudgetService);
  activityService = inject(ActivityService);  // Inyecta el servicio

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

  checkboxChange(activityNearby: IActivity, event: any): void {

    activityNearby.iconUrl = '';
    
    const lat = (activityNearby.location as any).lat;
    const lng = (activityNearby.location as any).lng;
    
    if (typeof lat === 'number' && typeof lng === 'number') {
      activityNearby.latitude = lat;
      activityNearby.longitude = lng;
    } else {
      activityNearby.latitude = 0;
      activityNearby.longitude = 0;
    }

    activityNearby.priceLevel = 0;

    if (event.target.checked) {
      this.activityService.addItem(activityNearby);  
      this.notifyService.onCustomSimpleNotify('Added to the list', 'The activity has been added to the list');

    } else {
      if (activityNearby.id) {

        this.activityService.removeItem(activityNearby.id);
        this.notifyService.onCustomSimpleNotify('Removed from the list', 'The restaurant has been removed of the list');
      }
    }
  }


}
