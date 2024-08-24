import { TestBed } from "@angular/core/testing";

import { TripRecommendationService } from "./trip-recommendation.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TripRecommendationService", () => {
  let service: TripRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TripRecommendationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
