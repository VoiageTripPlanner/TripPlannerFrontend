import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CountriesInterestComponent } from "./countries-interest.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AsyncPipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("CountriesInterestComponent", () => {
  let component: CountriesInterestComponent;
  let fixture: ComponentFixture<CountriesInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountriesInterestComponent,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        AsyncPipe,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
