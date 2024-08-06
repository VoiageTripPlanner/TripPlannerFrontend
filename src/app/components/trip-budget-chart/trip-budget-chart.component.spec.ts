import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripBudgetChartComponent } from './trip-budget-chart.component';

describe('TripBudgetChartComponent', () => {
  let component: TripBudgetChartComponent;
  let fixture: ComponentFixture<TripBudgetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripBudgetChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripBudgetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
