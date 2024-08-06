import { Component, inject } from '@angular/core';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { IBudgetPrices } from '../../interfaces/budget.interface';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-trip-budget-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './trip-budget-chart.component.html',
  styleUrl: './trip-budget-chart.component.scss'
})
export class TripBudgetChartComponent {
  public chartData!: { name: string, value: number }[];
  public totalInvestment!: number;
  public view: [number, number] = [400, 200];
  public gradient: boolean = true;
  public showLegend: boolean = true;
  public showLabels: boolean = false;
  public isDoughnut: boolean = true;
  public legendPosition: LegendPosition = LegendPosition.Below;
  private statisticsService: StatisticsService = inject(StatisticsService);

  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    this.getChartData();
  }

  private getChartData(): void {
    this.statisticsService.getTripBudgetOverview().subscribe((budgetData: IBudgetPrices) => {
      this.chartData = [
        { name: 'Flights', value: budgetData.flightAmount },
        { name: 'Lodge', value: budgetData.lodgeAmount },
        { name: 'Food', value: budgetData.foodAmount! },
        { name: 'Activities', value: budgetData.activitiesAmount! },
        { name: 'Other', value: budgetData.otherAmount! }
      ];
      this.totalInvestment = budgetData.total;
    });
  }

}
