import { Component, effect, inject, Signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { UpdateUserComponent } from "../update-user/update-user.component";
import { CountriesInterestComponent } from "../../components/countries-interest/countries-interest.component";
import { UserCountryInterestService } from "../../services/user-country-interest.service";
import { UserService } from "../../services/user.service";
import { ICountryInterest } from "../../interfaces/country-interest.interface";
import { CountryService } from "../../services/country.service";
import { CurrencyService } from "../../services/currency.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    UpdateUserComponent,
    CountriesInterestComponent,
    NgIf,
  ],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.scss",
})
export class UserProfileComponent {
  public countryInterestData!: Signal<ICountryInterest | null>;
  public userId!: number;
  private countryInterestService: UserCountryInterestService = inject(
    UserCountryInterestService,
  );
  private userService: UserService = inject(UserService);
  private countryService: CountryService = inject(CountryService);
  private currencyService: CurrencyService = inject(CurrencyService);

  constructor() {
    this.countryService.getAllSignal();
    this.currencyService.getAllSignal();
    this.countryInterestData =
      this.countryInterestService.userCountryInterestSig;
    effect(() => {
      this.userId = this.userService.userSig().id ?? 0;
      this.countryInterestService.getUserCountryInterest(this.userId);
    });
  }

  public saveCountryInterest(countryInterest: ICountryInterest): void {
    const countryInterestToSave: ICountryInterest = {
      userId: this.userId,
      savedCountries: [],
      deletedCountries: [],
    };
    countryInterest.savedCountries.forEach((country) => {
      if (!this.countryInterestData()?.savedCountries.includes(country)) {
        countryInterestToSave.savedCountries.push(country);
      }
    });
    countryInterest.deletedCountries.forEach((country) => {
      if (this.countryInterestData()?.savedCountries.includes(country)) {
        countryInterestToSave.deletedCountries.push(country);
      }
    });
    this.countryInterestService.updateUserCountryInterest(
      countryInterestToSave,
    );
  }
}
