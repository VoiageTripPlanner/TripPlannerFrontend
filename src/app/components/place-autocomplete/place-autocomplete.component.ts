import { GoogleService } from './../../services/google.service';
import { Router } from '@angular/router';
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
import { IActivity } from '../../interfaces/activities.interface';

@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss'],
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Enter address...';

  @Output() placeChanged = new EventEmitter<IActivity>();
  @Output() nearbyPlacesFound = new EventEmitter<IActivity[]>();

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
        const result: IActivity = {
          address: this.inputField.nativeElement.value,
          id: place?.place_id,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          latitude: place?.geometry?.location?.lat() ?? 0,
          longitude: place?.geometry?.location?.lng() ?? 0, 
          rating: place?.rating,
          types: place?.types,
          pricelevel: place?.price_level, 
          website: place?.website,          
        };
        this.placeChanged.emit(result);
        console.log(JSON.stringify(result, null, 4));

        localStorage.setItem('destinationName', JSON.stringify(result.name));
        localStorage.setItem('latitudeDestination', JSON.stringify(result.latitude));
        localStorage.setItem('longitudeDestination', JSON.stringify(result.longitude));
        localStorage.setItem('destinationAddress', JSON.stringify(result.address));
        localStorage.setItem('destination', JSON.stringify(result));
        localStorage.setItem('destinationLocation', JSON.stringify(result));
       if (result.location) {
        this.findNearbyPlaces(result.location);
        }
      });
    });

    const map = new google.maps.Map(this.inputField.nativeElement, { 
      center: new google.maps.LatLng(0, 0),
      zoom: 2,
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
    const radiusString = "50000"; 
    const radiusNumber = parseInt(radiusString, 10); 

    const request = {
      location: location,
      radius: radiusNumber,
      type: 'tourist_attraction',
    };

    this.placesService?.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const nearbyPlacesPromises = results.map((place) => {
          if (!place.place_id) {
            return Promise.reject(`Place ID is undefined for place: ${place.name}`);
          }

          return new Promise<IActivity>((resolve, reject) => {
            this.placesService?.getDetails({ placeId: place.place_id! }, (placeDetails, detailsStatus) => {
              if (detailsStatus === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                resolve({
                  address: placeDetails.vicinity || '',
                  name: placeDetails.name,
                  id: placeDetails.place_id,
                  location: placeDetails.geometry?.location,
                  imageUrl: this.getPhotoUrl(placeDetails),
                  rating: placeDetails?.rating,
                  pricelevel: placeDetails?.price_level,
                  website: placeDetails.website || ''
                });
              } else {
                reject(`Failed to get details for place ID ${place.place_id}`);
              }
            });
          });
        });

        Promise.all(nearbyPlacesPromises).then((nearbyPlaces) => {
          this.nearbyPlacesFound.emit(nearbyPlaces);
          localStorage.setItem('nearbyPlaces', JSON.stringify(nearbyPlaces));
          console.log(JSON.stringify(nearbyPlaces, null, 4));
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  }
}
