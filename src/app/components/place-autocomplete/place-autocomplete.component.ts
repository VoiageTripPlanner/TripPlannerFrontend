import { GoogleService } from './../../services/google.service';
import { Router } from '@angular/router';
import { routes } from './../../app.routes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IPlaceSearchResult } from '../../interfaces/placeSearch';


@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline">
      <input [placeholder]="placeholder" #inputField matInput />
    </mat-form-field>
  `,
  styles: [
    `
      .mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Enter address...';

  @Output() placeChanged = new EventEmitter<IPlaceSearchResult>();
  @Output() nearbyPlacesFound = new EventEmitter<IPlaceSearchResult[]>();

  autocomplete: google.maps.places.Autocomplete | undefined;
  placesService: google.maps.places.PlacesService | undefined;

  listener: any;

  private ngZone: NgZone;
  private googleService: GoogleService;
  private router: Router;
  private geocoder: (new () => google.maps.Geocoder) | undefined;

  constructor(ngZone: NgZone, googleService: GoogleService, router: Router) {
    this.ngZone = new NgZone({ enableLongStackTrace: false });
    this.googleService = new GoogleService();
    this.router = new Router();
    this.geocoder = google.maps.Geocoder;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: IPlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
          latitude: place?.geometry?.location?.lat() ?? 0,
          longitude: place?.geometry?.location?.lng(), 
          rating: place?.rating,
          types: place?.types,
          pricelevel: place?.price_level,           
        };
        this.placeChanged.emit(result);
        console.log(JSON.stringify(result, null, 4));

       if (result.location) {
        this.findNearbyPlaces(result.location);
        }
      });
    });

    const map = new google.maps.Map(this.inputField.nativeElement, { // Temporary map to initialize the PlacesService
      center: new google.maps.LatLng(0, 0),
      zoom: 10,
    });
    this.placesService = new google.maps.places.PlacesService(map);
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  findNearbyPlaces(location: google.maps.LatLng) {
    
    const radiusString = "50000"; // Example dynamic or external radius value
    const radiusNumber = parseInt(radiusString, 10); // Convert to number

    const request = {
      location: location,
      radius: radiusNumber,
      type: 'tourist_attraction',
    };

    this.placesService?.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const nearbyPlaces: IPlaceSearchResult[] = results.map((place) => ({
          address: place.vicinity || '',
          name: place.name,
          location: place.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place.icon,
          types: place.types,
          rating: place?.rating,
          placelevel: place?.price_level,  
        }));

        this.nearbyPlacesFound.emit(nearbyPlaces);
        console.log(JSON.stringify(nearbyPlaces, null, 4));
      }
    });
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
