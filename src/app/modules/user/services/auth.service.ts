import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import 'firebase/auth';
import 'firebase/database';
import { DatabaseReference, getDatabase, ref, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, Auth, UserCredential } from 'firebase/auth'
import { UserModel } from '../models/userModel'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth

  constructor() { }

  loginUser(email: string, password: string): Promise<any> {
    this.auth = getAuth()

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  signupUser(email: string, password: string, next?, error?, complete?): Subscription {
    return this.createUserObserver(email, password).subscribe({
      next: v => {
        console.log('creato user', v)
        sendEmailVerification(v['user'])
        const db = getDatabase()
        const newUser = new UserModel(v['user']).load(v['user'])
        const usersRef = ref(db, '/userProfile')
        console.log('new user',newUser.serialize())
        push(usersRef, newUser.serialize())
        if (next) {
          next(v['user'])
        }
      },
      error: e => {
        console.error('errore', e)

        if (error) {
          error(e)
        }
      },
      complete: () => {
        console.log('ok')
        if (complete) {
          complete()
        }
      }
    })

  }


  createUserObserver(email, pass): Observable<unknown> {
    const auth = getAuth()
    const observer = new Observable(subscriber => {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential: UserCredential) => {
          subscriber.next(userCredential);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
          subscriber.complete();
        });
    });

    return observer;
  }

  logoutUser(): Promise<void> {
    const userId: string = firebase.auth().currentUser.uid;
    firebase

      .database()
      .ref(`/userProfile/${userId}`)
      .off();
    return firebase.auth().signOut();
  }

}