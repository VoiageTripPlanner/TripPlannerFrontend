import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';



@Component({
  selector: 'app-place-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card *ngFor="let place of places" class="mat-elevation-z5">
      <img
        class="place-image"
        mat-card-image
        [src]="place?.imageUrl"
        alt="Place Photo"
      />
      <mat-card-header>
        <img [src]="place?.iconUrl" mat-card-avatar />
        <mat-card-title>{{ place?.name }}</mat-card-title>
        <mat-card-subtitle>{{ place?.address }}</mat-card-subtitle>
      </mat-card-header>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .place-image {
        height: 200px;
        object-fit: cover;
        object-position: center;
      }
    `,
  ],
})
export class PlaceCardComponent implements OnInit {
  @Input() places: IPlaceSearchResult[] = [];

  constructor() {}

  ngOnInit(): void {}
}

