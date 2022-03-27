import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  log = console.log.bind(document)
  constructor(private activatedRoute: ActivatedRoute,private router:Router,public httpClient:HttpClient) { }

  fileToUpload: File = null;

onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
}

// call this method when you want the upload to begin
uploadFile(fileToUpload: File): Observable<Object> {
    const endpoint = 'backend-upload-url';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData)
}

  

  ngOnInit() {
    this.log('initiated folder')
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    /* firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.log('user',user)
    }) */
    const auth = getAuth()
 onAuthStateChanged(auth,(user)=>{
   if(user){
     this.log('user ok',user)
   }
   else{
     this.log('no user')
     this.router.navigateByUrl('users/login')
   }
 })
  }

}
