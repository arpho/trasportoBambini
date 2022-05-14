import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
@Component({
  selector: 'app-show-tracking',
  templateUrl: './show-tracking.component.html',
  styleUrls: ['./show-tracking.component.scss'],
})
export class ShowTrackingComponent implements OnInit,OnChanges {
//@Input() latLon:{lat:number,lng:number}
@Input() driverKey:string

  constructor(
	  public toaster:MyToastService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  // google maps zoom level
  zoom: number = 12;
  trackingIsOn = false
  trackId
  
  // initial center position for the map
  lat: number = 45.4481786;
  lng: number = 9.1831583;
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
    console.log("click",$event)
    this.markers.push({
      lat: 3,//$event.coords.lat,
      lng: 4,// $event.coords.lng,
      draggable: true
    });
  }

  triggeredTracking(ev){
	console.log("triggered",ev)
	this.trackingIsOn = ev.detail.checked
	if(this.trackingIsOn){
		this.track()
	}
	else{
		this.stopTracking()
	}
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

  track(){
	console.log('tracking')
	let options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};

	let success =(pos)=>{
		var crd = pos.coords;
		console.log("actual pos",pos)
		this.markers.push({
			lat:pos.coords.latitude,
			lng:pos.coords.longitude,
			label:"p",
			draggable:false
		})
	}
	let error = (error)=>{
		console.error(error)
	}
	this.trackId = navigator.geolocation.watchPosition(success,error,options)
	this.toaster.presentToast("il tracking è attivo")
}
stopTracking(){
	navigator.geolocation.clearWatch(this.trackId)
	this.toaster.presentToast("il tracking non è attivo")
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
