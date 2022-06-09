import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Position } from '@capacitor/geolocation';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { Address } from '../../../models/Address';
//import {  } from 'google-maps';



@Component({
	selector: 'app-address',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
	providers: [{
		provide: NG_VALUE_ACCESSOR,
		multi: true,
		useExisting: AddressComponent
	},]
})
export class AddressComponent implements OnInit, ControlValueAccessor, OnDestroy {
	@Input() address: Address = new Address()

	addressForm
	disabled = false
	canGeodecode = false
	cangeocodeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false)
	showSpinner:BehaviorSubject<boolean>= new BehaviorSubject(false)

	private onChange: Function = (password: string) => { };
	// tslint:disable-next-line: ban-types
	private onTouch: Function = () => { };
	touched = false;
	subscription: Subscription
	canGeocode = false
	constructor(
		public formBuilder: FormBuilder,
		public toaster: MyToastService,
		// public geocoder:google,
		mapsAPILoader: MapsAPILoader,) {


	}
	protected injector: Injector;
	protected el: ElementRef<any>;
	protected lastValue: any;
	writeValue(value: Address): void {
		this.address = value
	}


	registerOnChange(fn) {
		this.onChange = fn;
	}
	registerOnTouched(fn) {
		this.onTouch = fn;
	}
	fetchAddress(location) {
		const address = new Address()
		location['address_components'].forEach(element => {
			if (element.types[0] == 'street_number') {
				address.number = element.short_name
			}
			if (element.types[0] == 'route') {
				address.street = element.short_name
			}
			if (element.types[0] == 'locality') {
				address.city = element.short_name

			}

			if (element.types[0] == 'administrative_area_level_2') {
				address.province = element.short_name
			}

			if (element.types[0] == 'postal_code') {
				address.cap = element.short_name
			}


		});
		return address
	}

	setAddressForm(address: Address) {
    console.log("setting address form with",address)
		this.addressForm.controls.number.setValue(address.number)
		this.addressForm.controls.cap.setValue(address.cap)
		this.addressForm.controls.city.setValue(address.city)
		this.addressForm.controls.province.setValue(address.province)
		this.addressForm.controls.street.setValue(address.street)
    this.addressForm.controls.latitude.setValue(address.latitude)
    this.addressForm.controls.longitude.setValue(address.longitude)
	}

	localize() {
    this.address = new Address()
    console.log("localizing")
		this.showSpinner.next(true)
		navigator.geolocation.getCurrentPosition((position: Position) => {
      console.log("got position")
			this.address.latitude = position.coords.latitude
			this.addressForm.controls.longitude.setValue(position.coords.longitude)
			this.addressForm.controls.latitude.setValue(position.coords.latitude)
			this.address.longitude = position.coords.longitude
			let geodecoder = new google.maps.Geocoder()
			let latlng = { lat: position.coords.latitude, lng: position.coords.longitude }
			geodecoder.geocode({ 'location': latlng }, results => {
				this.showSpinner.next(false)
				this.address = this.fetchAddress(results[0])
				this.setAddressForm(this.address)

			})
		})
	}

	geodecode() {
		const address = new Address(this.addressForm.value)
		let geodecoder = new google.maps.Geocoder()
		geodecoder.geocode({ address: this.address.fetchAddress() }, (response) => {
			if (response) {
				this.addressForm.controls.latitude.setValue(response[0].geometry.location.lat())
				this.addressForm.controls.longitude.setValue(response[0].geometry.location.lng())
			}
			else {
				this.toaster.presentToast("non sono riuscito a ricavare le coordinate dell'indirizzo che mi hai fornito")
			}
		})

	}

	markAsTouched() {
		if (!this.touched) {
			this.onTouch();
			this.touched = true;
		}
	}

	handleChangeEvent(el: HTMLElement, value: any): void {
		throw new Error('Method not implemented.');
	}
	_handleBlurEvent(el: any): void {
		throw new Error('Method not implemented.');
	}
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled
	}
	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}
	ngAfterViewInit(): void {
	}


	ngOnInit() {
		if (this.address) {

			this.addressForm = this.formBuilder.group({
				street: new FormControl(this.address.street),
				cap: new FormControl(this.address.cap),
				city: new FormControl(this.address.city),
				longitude: new FormControl(this.address.longitude),
				latitude: new FormControl(this.address.latitude),
				province: new FormControl(this.address.province),
				number: new FormControl(this.address.number)
			})
			this.subscription = this.addressForm.valueChanges.subscribe(d => {
				this.cangeocodeSubject.next(!!d['street'] && !!d["city"] && !!d['number'])
				this.markAsTouched()
				this.onChange(d)
			})
		}
    else{
      console.log("initializing empty address")
      this.address = new Address()
      this.addressForm = this.formBuilder.group({
				street: new FormControl(this.address.street),
				cap: new FormControl(this.address.cap),
				city: new FormControl(this.address.city),
				longitude: new FormControl(this.address.longitude),
				latitude: new FormControl(this.address.latitude),
				province: new FormControl(this.address.province),
				number: new FormControl(this.address.number)
			})
    }


	}




	onTouched: any = () => { };

}
