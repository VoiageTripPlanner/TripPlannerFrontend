import { Component, Inject, inject } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { Chart, Tooltip } from 'chart.js';
import { ChoroplethChart, topojson } from 'chartjs-chart-geo';
import { DOCUMENT } from '@angular/common';

ChoroplethChart.register([Tooltip]);

@Component({
  selector: 'app-countries-heatmap',
  standalone: true,
  imports: [],
  templateUrl: './countries-heatmap.component.html',
  styleUrl: './countries-heatmap.component.scss'
})
export class CountriesHeatmapComponent {
  private statisticsService: StatisticsService = inject(StatisticsService);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.statisticsService.getCountryTopoJson().subscribe((data: any) => {
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
                data: countries.map((d: any) => ({feature: d, value: Math.random()*2})),
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
    });
  }
}
