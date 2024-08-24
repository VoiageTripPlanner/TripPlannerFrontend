import { inject, Injectable, Signal, signal } from "@angular/core";
import { ICountryInterest } from "../interfaces/country-interest.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserCountryInterestService {
  private url = "userCountryWishlist";
  private http: HttpClient = inject(HttpClient);
  private userCountryInterest = signal<ICountryInterest | null>({
    userId: 0,
    savedCountries: [],
    deletedCountries: [],
  });

  public get userCountryInterestSig(): Signal<ICountryInterest | null> {
    return this.userCountryInterest.asReadonly();
  }

  constructor() {}

  public getUserCountryInterest(userId: number): void {
    this.http.get<ICountryInterest>(`${this.url}/${userId}`).subscribe({
      next: (response: ICountryInterest) => {
        if (response) {
          this.userCountryInterest.set(response);
        } else {
          this.userCountryInterest.set(null);
        }
      },
      error: () => {
        this.userCountryInterest.set(null);
      },
    });
  }

  public updateUserCountryInterest(countryInterest: ICountryInterest): void {
    this.http.post<ICountryInterest>(`${this.url}`, countryInterest).subscribe({
      next: (response: ICountryInterest) => {
        if (response) {
          this.userCountryInterest.set(response);
        } else {
          this.userCountryInterest.set(null);
        }
      },
      error: () => {
        console.error("Error updating user country interest");
      },
    });
  }
}
