import { Injectable, Signal, signal } from "@angular/core";
import { BaseService } from "./base-service";
import { ICurrency } from "../interfaces/currency.interface";

@Injectable({
  providedIn: "root",
})
export class CurrencyService extends BaseService<ICurrency> {
  protected override source: string = "currency";
  private currencyListSig = signal<ICurrency[]>([]);

  public get currenciesSig(): Signal<ICurrency[]> {
    return this.currencyListSig;
  }

  onGetDefaultCurrency() {
    const defaultValue: ICurrency = {
      id: "",
      name: "Dolar",
      code: "USD",
      currencySymbol: "$",
    };

    return defaultValue;
  }

  public getAllSignal(): void {
    this.findAll().subscribe({
      next: (response: any) => {
        if (response) {
          this.currencyListSig.set(response);
        } else {
          this.currencyListSig.set([]);
        }
      },
      error: (error: any) => {
        console.error("Error fetching countries", error);
      },
    });
  }
}
