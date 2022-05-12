import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-tracking',
  templateUrl: './show-tracking.component.html',
  styleUrls: ['./show-tracking.component.scss'],
})
export class ShowTrackingComponent implements OnInit {

  constructor() { }

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  ngOnInit() {
	navigator.geolocation.getCurrentPosition((position) => {
		this.center = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude,
		}
	  })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
