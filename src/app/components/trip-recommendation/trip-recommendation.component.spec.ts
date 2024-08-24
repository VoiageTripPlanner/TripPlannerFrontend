import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TripRecommendationComponent } from "./trip-recommendation.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TripRecommendationComponent", () => {
  let component: TripRecommendationComponent;
  let fixture: ComponentFixture<TripRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripRecommendationComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TripRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
