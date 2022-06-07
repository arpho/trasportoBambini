import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.scss'],
})
export class LogoutUserComponent implements OnInit {

  constructor() {

    
   }
   logout(){
     console.log("logout")
   }

  ngOnInit() {}

}
