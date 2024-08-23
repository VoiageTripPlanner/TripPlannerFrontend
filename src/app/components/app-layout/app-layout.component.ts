import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './elements/topbar/topbar.component';
import { SidebarComponent } from './elements/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { TripRecommendationService } from '../../services/trip-recommendation.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    SvgIconComponent
  ],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  public title?: string;
  public readonly currentYear: number;

  constructor(public layoutService: LayoutService, private tripRecommendationService: TripRecommendationService) {
    this.currentYear = new Date().getFullYear();
    this.layoutService.title.subscribe((title) => (this.title = title));
    this.tripRecommendationService.getTripRecommendation();
  }
}
