import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesNearbyCardComponent } from './activities-nearby-card.component';

describe('ActivitiesNearbyCardComponent', () => {
  let component: ActivitiesNearbyCardComponent;
  let fixture: ComponentFixture<ActivitiesNearbyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesNearbyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivitiesNearbyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
