import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';
import { PlaceAutocompleteComponent, PlaceSearchResult } from '../../components/place-autocomplete/place-autocomplete.component';
import { MapDisplayComponent } from '../../components/place-autocomplete/map-display.component';
import { PlaceCardComponent } from '../../components/place-autocomplete/place-card.componet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    PlaceAutocompleteComponent,
    PlaceCardComponent,
    MapDisplayComponent,
    NgIf,
  ],
  template: `
    <mat-toolbar color="primary"> Voiage </mat-toolbar>

    <div class="container">
      <div class="input-area">
        <h2>I want to go from</h2>
        <app-place-autocomplete
          (placeChanged)="fromValue = $event"
          (nearbyPlacesFound)="onNearbyPlacesFound($event)"
          placeholder="Enter from address..."
        ></app-place-autocomplete>
        <h2>to</h2>
        <app-place-autocomplete
          (placeChanged)="toValue = $event"
          (nearbyPlacesFound)="onNearbyPlacesFound($event)"
          placeholder="Enter to address..."
        ></app-place-autocomplete>
      </div>
      <div
        class="display-area"
        [hidden]="!fromValue.address && !toValue.address"
      >
        <div>
          <app-place-card [places]="fromNearbyPlaces"></app-place-card>
          <app-place-card [places]="toNearbyPlaces"></app-place-card>
        </div>
        <app-map-display 
          [from]="fromValue" 
          [to]="toValue"
          [pointsOfInterest]="allNearbyPlaces">
        </app-map-display>
      </div>
    </div>
  `,
  styles: [
    `
      .input-area {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .display-area {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        height: calc(100vh - 180px);

        > div {
          width: 30%;
          overflow: auto;
          padding: 8px;
          height: inherit;

          > * {
            margin-bottom: 16px;
          }
        }

        > app-map-display {
          width: 70%;
          height: inherit;
        }
      }

      .display-area[hidden] {
        display: none;
      }

      .container {
        padding: 24px;
      }

      app-place-autocomplete {
        width: 300px;
      }
    `,
  ],
})
export class RecomendationsComponent {

  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };
  fromNearbyPlaces: PlaceSearchResult[] = [];
  toNearbyPlaces: PlaceSearchResult[] = [];
  allNearbyPlaces: PlaceSearchResult[] = [];

  onNearbyPlacesFound(places: PlaceSearchResult[]) {
    // Logic to update nearby places based on which field is being updated
    if (this.fromValue.address) {
      this.fromNearbyPlaces = places;
    }
    if (this.toValue.address) {
      this.toNearbyPlaces = places;
    }

    // Merge all places to display in the map
    this.allNearbyPlaces = [...this.fromNearbyPlaces, ...this.toNearbyPlaces];
  }
}
