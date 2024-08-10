import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesNearbyComponent } from './activities-nearby.component';

describe('ActivitiesNearbyComponent', () => {
  let component: ActivitiesNearbyComponent;
  let fixture: ComponentFixture<ActivitiesNearbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitiesNearbyComponent] // Changed from imports to declarations
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

