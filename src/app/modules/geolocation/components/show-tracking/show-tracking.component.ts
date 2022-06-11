import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { marker } from '../../models/marker';
import { LatLong } from '../../models/latlong';
import { TrackingAction } from './bussiness/trackingActions';
@Component({
  selector: 'app-show-tracking',
  templateUrl: './show-tracking.component.html',
  styleUrls: ['./show-tracking.component.scss'],
})
export class ShowTrackingComponent implements OnInit {
//@Input() latLon:{lat:number,lng:number}
@Output() trackData= new EventEmitter<LatLong>()
@Output() trackingStarted = new EventEmitter<boolean>()
@Output() trackingStopped = new EventEmitter<boolean>()
@Input() driverKey:string
  map: google.maps.Map<Element>;

  constructor(
	  public toaster:MyToastService
  ) { } 
  markers: marker[] = [

  ]
  error= (error)=>{
		console.error(error)
	}



  

latlng:LatLong[]= []
  success = (pos)=>{
		var crd = pos.coords;
    this.latlng.push({lat:pos.coords.latitude,lng:pos.coords.longitude})
    const data= {lat:pos.coords.latitude,lng: pos.coords.longitude}
    this.trackData.emit(data)
	 	this.markers=[{
			lat:pos.coords.latitude,
			lng:pos.coords.longitude,
			label:"p",
			draggable:false
		} ]
  }

  trackingOperations= new TrackingAction(this.success,this.error,()=>{
    this.toaster.presentToast("tracking attivato")
  },()=>{
    this.toaster.presentToast("il tracking è stato  disattivato")
  })
  // google maps zoom level
  zoom: number = 12;
  trackingIsOn = false
  
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
  }
  
  mapClicked($event: MouseEvent) {
    console.log("click",$event)
    this.markers.push({
      lat: 3,//$event.coords.lat,
      lng: 4,// $event.coords.lng,
      draggable: true
    });
  }
  info=""

  

  polylineOptions = {
    path: this.latlng,
    strokeColor: '#00ff2f',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    };

  triggeredTracking(ev){
	this.trackingIsOn = ev.detail.checked
	if(this.trackingIsOn){
		this.track()
    this.trackingStarted.emit(true)
    this.trackingStopped.emit(false)
	}
	else{
		this.stopTracking()
    this.trackingStarted.emit(false)
    this.trackingStopped.emit(true)
	}
}

    stopTracking(){
      return this.trackingOperations.stopTracking()
    }
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  





  ngOnInit() {
	navigator.geolocation.getCurrentPosition((position) => {
		this.center = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude,
		}
    this.initMap()
	  },(error)=>{
      console.error(error)
    },{
      enableHighAccuracy:true,
      timeout:5000,
      maximumAge:0
    })
  }

  track(){
	return this.trackingOperations.track()


}


  // Initialize and add the map
 initMap(): void {
  // The location of Uluru
  let map: google.maps.Map;
  const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center,
    zoom: 12
  });
  this.map = map
 }

 

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
