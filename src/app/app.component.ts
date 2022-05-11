import { Component, OnInit } from '@angular/core';
import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import {configs} from "./configs/credentials"
import { Utente } from './models/Utente';
import { CustomersService } from './services/customers/customers.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

 
  public appPages =[]
  app = initializeApp(configs.firebase)
  constructor(public customers:CustomersService) {
 
  }
  ngOnInit(): void {
    const app = initializeApp(configs.firebase)
    const auth = getAuth()
    onAuthStateChanged(auth,async (user)=>{


		const token = await user.getIdTokenResult(true)
		console.log('user ok è',user)
		console.log('token.claims',token.claims)
      if(user){
		const token = await user.getIdTokenResult(true)
		console.log('claims enabled',token.claims.enabled)
		console.log('role claim',token['role'])
     
			
           this.appPages= [   { title: 'utenti', url: '/customers', icon: 'people' },
          { title: 'pulmini', url: '/flotta', icon: 'bus' },
        {title:'Scuole',url:'/schools-list',icon:'business'},
      {title:'Studenti',url:'/students',icon:'happy'},
    {title:'punti di raccolta', url:'collection-points-list',icon:'location'},
    {title:'Genitori', url:'/parents-list',icon:'body'}]
		  
		
	  }
	})

      
 
}
}