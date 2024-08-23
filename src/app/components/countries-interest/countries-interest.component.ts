import { Component, EventEmitter, inject, Input, OnInit, Output, Signal, signal, ViewChild } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/country.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInput, MatChipsModule } from '@angular/material/chips';
import {A, COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, Observable, of, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ICountryInterest } from '../../interfaces/country-interest.interface';

@Component({
  selector: 'app-countries-interest',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatAutocompleteModule, ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './countries-interest.component.html',
  styleUrl: './countries-interest.component.scss'
})
export class CountriesInterestComponent implements OnInit {
  @Input() public countryInterestData!: ICountryInterest|null;
  @Input() public userId!: number;
  @Output() public saved: EventEmitter<ICountryInterest> = new EventEmitter<ICountryInterest>();
  @ViewChild(MatChipInput) chipInput!: MatChipInput;

  public countryInterestSaved!: ICountryInterest;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public displayCountryName: ((value: any) => string) | null = (value) => {
    return this.countryService.countriesSig().find(country => country.id === value)?.name ?? ''
  };
  public countryCtrl: FormControl = new FormControl('');
  public filteredCountries$!: Observable<ICountry[]>;
  private countryService: CountryService = inject(CountryService);
  private _countriesSelected = signal<string[]>([]);

  public get countriesSelected(): Signal<string[]> {
    return this._countriesSelected.asReadonly();
  }

  public ngOnInit(): void {
    this.filteredCountries$ = this.countryCtrl?.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCountries(value || ''))
    ) ?? of([]);
    this.countryInterestSaved = {
      userId: this.userId,
      savedCountries: [],
      deletedCountries: []
    };
    this._countriesSelected.set(this.countryInterestData?.savedCountries ?? []);
  }

  public remove(country: string): void {
    this._countriesSelected.update(countries => countries.filter(c => c !== country));
    this.countryInterestSaved.deletedCountries.push(country);
    this.countryInterestSaved.savedCountries = [...this._countriesSelected()];
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    const country = event.option.value;
    this._countriesSelected.update(countries => [...countries, country]);
    this.countryInterestSaved.savedCountries.push(country);
    this.countryCtrl.setValue('');
    this.countryCtrl.updateValueAndValidity();
    this.chipInput.clear();
    event.option.deselect();
  }

  public getCountryName(id: string): string {
    return this.countryService.countriesSig().find(country => country.id === id)?.name ?? '';
  }

  public saveCountries(): void {
    this.saved.emit(this.countryInterestSaved);
  }

  private filterCountries(value: string): ICountry[] {
    return this.countryService.countriesSig().filter(country => country.name.toLowerCase().includes(value.toLowerCase()));
  }
}
