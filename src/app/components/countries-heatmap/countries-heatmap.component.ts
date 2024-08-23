import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { Chart, Tooltip } from 'chart.js';
import { ChoroplethChart, topojson } from 'chartjs-chart-geo';
import { AsyncPipe, CommonModule, DOCUMENT, NgIf } from '@angular/common';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { CountryVisit } from '../../interfaces/country-visit.interface';

ChoroplethChart.register([Tooltip]);

@Component({
  selector: 'app-countries-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries-heatmap.component.html',
  styleUrl: './countries-heatmap.component.scss'
})
export class CountriesHeatmapComponent implements OnDestroy {
  public countryVisitsList$!: Observable<CountryVisit[]>;
  private statisticsService: StatisticsService = inject(StatisticsService);
  private subscriptions!: Subscription;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.countryVisitsList$ = this.statisticsService.countryVisitsList$;
    this.subscriptions = new Subscription();
    this.subscriptions.add(
      combineLatest([this.countryVisitsList$, this.statisticsService.getCountryTopoJson()])
        .subscribe(([countryVisits, data]) => {
          if (countryVisits.length) {
            const countries = (topojson.feature(data, data.objects.countries) as any).features;
            const canvas: HTMLCanvasElement = this.document.getElementById("canvas") as HTMLCanvasElement;
            if (canvas) {
              const context = canvas.getContext("2d");
              if (context) {
                const chart = new ChoroplethChart(context, {
                  data: {
                    labels: countries.map((d: any) => d.properties.name),
                    datasets: [{
                      label: 'Countries',
                      data: countries.map((d: any) => {
                        const visits = countryVisits.find(country => country.name === d.properties.name)?.visits ?? 0;
                        return {
                          feature: d, 
                          value: visits
                        };
                      }),
                    }]
                  },
                  options: {
                    showOutline: true,
                    showGraticule: true,
                    plugins: {
                      legend: {
                        display: true
                      },
                      tooltip: {
                        enabled: true
                      }
                    },
                    scales: {
                      projection: {
                        axis: 'x',
                        projection: 'equalEarth'
                      }
                    }
                  }
                });
              }
            }
          }
        }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
