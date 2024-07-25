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

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
  price ?: number;
}

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

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
  @Output() nearbyPlacesFound = new EventEmitter<PlaceSearchResult[]>();

  autocomplete: google.maps.places.Autocomplete | undefined;
  placesService: google.maps.places.PlacesService | undefined;

  listener: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
          price: place?.price_level,

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
      zoom: 15,
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
    
    const radiusString = "500"; // Example dynamic or external radius value
const radiusNumber = parseInt(radiusString, 10); // Convert to number

    const request = {
      location: location,
      radius: radiusNumber,
      type: 'cultura',
    };

    this.placesService?.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const nearbyPlaces: PlaceSearchResult[] = results.map((place) => ({
          address: place.vicinity || '',
          name: place.name,
          location: place.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place.icon,
          price: place.price_level,
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
