import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
