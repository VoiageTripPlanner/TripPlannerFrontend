import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TripsTableComponent } from "./trips-table.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("TripsTableComponent", () => {
  let component: TripsTableComponent;
  let fixture: ComponentFixture<TripsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsTableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TripsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
