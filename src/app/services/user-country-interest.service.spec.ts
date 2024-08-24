import { TestBed } from "@angular/core/testing";

import { UserCountryInterestService } from "./user-country-interest.service";
import { H } from "@angular/cdk/keycodes";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("UserCountryInterestService", () => {
  let service: UserCountryInterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserCountryInterestService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
