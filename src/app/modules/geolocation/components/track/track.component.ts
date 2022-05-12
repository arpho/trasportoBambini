import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {

  constructor() { }

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
		  alert(`current position ${pos.coords.latitude}, ${pos.coords.longitude}`)
	  }
	  let error = (error)=>{
		  console.error(error)
	  }
	  navigator.geolocation.watchPosition(success,error,options)
  }

  tracking(){
	  console.log('click')
  }


  ngOnInit() {}

}
