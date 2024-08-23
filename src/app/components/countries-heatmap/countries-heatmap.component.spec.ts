import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesHeatmapComponent } from './countries-heatmap.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CountriesHeatmapComponent', () => {
  let component: CountriesHeatmapComponent;
  let fixture: ComponentFixture<CountriesHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesHeatmapComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountriesHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
