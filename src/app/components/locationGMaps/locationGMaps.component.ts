import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';


@Component({
  selector: 'app-locationGMaps',
  standalone: true,
  imports: [],
  templateUrl: './locationGMaps.component.html',
  styleUrl: './locationGMaps.component.scss'
})

export class LocationGMapsComponent implements AfterViewInit {
  //Título de la página
  title = 'googleMaps';
  //Obtener la referencia del elemento en el html
  @ViewChild('mapContainer', { static: false }) gmap : ElementRef = new ElementRef('mapContainer');

  //Declarar el mapa
  map!: google.maps.Map;
  //Declarar lasgoogle.maps.enadas
  lat = 9.748916999999999; 
  lng = -83.753428;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  //Opciones del mapa
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  //Inicializar el marcador
  marker = new google.maps.Marker({
    position: this.coordinates, 
    map: this.map
  });

  //Función para inicializar el mapa  
  mapInitializer() {
    this.map = new google.maps.Map(
      this.gmap.nativeElement, 
      this.mapOptions
    );
    this.marker.setMap(
      this.map
    );
  }

  //Función para obtener la ubicación actual
  ngAfterViewInit(): void {
    this.mapInitializer();
  } 
}
