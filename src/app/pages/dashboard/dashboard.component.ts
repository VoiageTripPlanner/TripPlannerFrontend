import { Component, effect, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CountriesHeatmapComponent } from '../../components/countries-heatmap/countries-heatmap.component';
import { TopCountriesComponent } from '../../components/top-countries/top-countries.component';
import { TripBudgetChartComponent } from '../../components/trip-budget-chart/trip-budget-chart.component';
import { TripRecommendationComponent } from '../../components/trip-recommendation/trip-recommendation.component';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopCountriesComponent, TripBudgetChartComponent, TripRecommendationComponent, CountriesHeatmapComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public userName!: string;
  private user: any;
  private statisticsService: StatisticsService = inject(StatisticsService);

  constructor(private userService: UserService) {
    effect(() => {
      this.user = this.userService.userSig();
      if (this.user.name) {
        this.userName = `${this.user.name} ${this.user.lastname}`;
        this.statisticsService.getCountryVisitsList(this.user.id);
        this.statisticsService.getTripBudgetOverview(this.user.id);
      }
    });
  }
}
