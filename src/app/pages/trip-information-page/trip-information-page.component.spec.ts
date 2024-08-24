import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TripInformationPageComponent } from "./trip-information-page.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

describe("TripInformationPageComponent", () => {
  let component: TripInformationPageComponent;
  let fixture: ComponentFixture<TripInformationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInformationPageComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
