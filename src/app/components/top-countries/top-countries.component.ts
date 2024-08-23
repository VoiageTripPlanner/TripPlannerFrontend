import { Component, inject } from '@angular/core';
import { CountryVisit } from '../../interfaces/country-visit.interface';
import { StatisticsService } from '../../services/statistics.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-top-countries',
  standalone: true,
  imports: [],
  templateUrl: './top-countries.component.html',
  styleUrl: './top-countries.component.scss'
})
export class TopCountriesComponent {
  public topCountries!: CountryVisit[];
  public countryFlags!: {[key: string]: [value: string]};
  public totalCountryVisited: number = 10;
  private statisticsService: StatisticsService = inject(StatisticsService);

  constructor() {
    this.getCountryFlagCodes();
    this.statisticsService.getTopCountries();
  }

  public getCountryFlag(country: string): string {
    const entries = Object.entries(this.countryFlags).find(([key, value]) => String(value) === country);
    if (entries) {
      return entries[0];
    }
    return '';
  }

  private getCountryFlagCodes(): void {
    combineLatest([this.statisticsService.topCountries$, this.statisticsService.getCountryFlagCodeJson()]).subscribe(([countries, flagCodes]) => {
      this.topCountries = countries;
      this.countryFlags = flagCodes;
    });
  }
}
