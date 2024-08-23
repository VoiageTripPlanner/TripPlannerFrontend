import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryService } from './services/country.service';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demo-angular-front';
  private countryService: CountryService = inject(CountryService);
  private currencyService: CurrencyService = inject(CurrencyService);

  constructor() {
    this.countryService.getAllSignal();
    this.currencyService.getAllSignal();
  }
}
