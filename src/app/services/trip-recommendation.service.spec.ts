import { TestBed } from '@angular/core/testing';

import { TripRecommendationService } from './trip-recommendation.service';

describe('TripRecommendationService', () => {
  let service: TripRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
