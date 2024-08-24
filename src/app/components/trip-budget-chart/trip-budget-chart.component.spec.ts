import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TripBudgetChartComponent } from "./trip-budget-chart.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { StatisticsService } from "../../services/statistics.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("TripBudgetChartComponent", () => {
  let component: TripBudgetChartComponent;
  let fixture: ComponentFixture<TripBudgetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TripBudgetChartComponent,
        NgxChartsModule,
        HttpClientTestingModule,
      ],
      providers: [StatisticsService],
    }).compileComponents();

    fixture = TestBed.createComponent(TripBudgetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
