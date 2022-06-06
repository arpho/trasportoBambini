import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';
import { UserModel } from '../modules/user/models/userModel';
import { UsersService } from '../modules/user/services/users.service';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  log = console.log.bind(document)
  latLon:{lat:number,lng:number}
  constructor(private activatedRoute: ActivatedRoute,private router:Router,public User:UsersService) { }

  fileToUpload: File = null;

onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
}

setPoint(data){
  console.log('pouit',data)
  this.latLon = data
}


track(){
	console.log('track')
} 


  ngOnInit() {
    this.folder ='Home' //this.activatedRoute.snapshot.paramMap.get('id');
    /* firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.log('user',user)
    }) */
    const auth = getAuth()
	
 onAuthStateChanged(auth,async (user)=>{
   if(user) {
	   const token = await user.getIdTokenResult(true)
     this.log('user ok è',user)
	 console.log('token.claims',token.claims)
   }
   else{
     this.log('no user')
     this.router.navigateByUrl('users/login')
   }
 })
  }

}
