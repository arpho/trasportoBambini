import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
@Component({
  selector: 'app-show-tracking',
  templateUrl: './show-tracking.component.html',
  styleUrls: ['./show-tracking.component.scss'],
})
export class ShowTrackingComponent implements OnInit {


  constructor() { }

  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: 3,//$event.coords.lat,
      lng: 4,// $event.coords.lng,
      draggable: true
    });
  }

    
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]

  ngOnInit() {
	navigator.geolocation.getCurrentPosition((position) => {
		this.center = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude,
		}
    this.initMap()
	  })
  }

  // Initialize and add the map
 initMap(): void {
  // The location of Uluru
  let map: google.maps.Map;
  const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 8
  });
 }

 

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
