import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationGMapsComponent } from './locationGMaps.component';

describe('LocationGMapsComponent', () => {
  let component: LocationGMapsComponent;
  let fixture: ComponentFixture<LocationGMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationGMapsComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

//   it('should initialize the map', () => {
//     const mapElement = fixture.nativeElement.querySelector('#mapContainer');
//     expect(mapElement).toBeTruthy();

//     const map = component.map;
//     expect(map).toBeTruthy();
//     expect(map instanceof google.maps.Map).toBe(true);

//     const marker = component.marker;
//     expect(marker).toBeTruthy();
//     expect(marker instanceof google.maps.Marker).toBe(true);
//   });
});