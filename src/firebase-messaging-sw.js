const { FirebaseError } = require("firebase/app")
import * as firebase from firebase
import {configs} from "./app/configs/credentials"
importScripts('https://www.gstatic.com/firebasewjs/9.6.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasewjs/9.6.7/firebase-messaging.js')
firebase.initializeApp(configs.firebase)
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(payload=>{
  console.log("background message",payload);

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
    })
    .then((windowClients) => {
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      windowClient.postMessage(data);
    }
    })
    .then(() => {
    return registration.showNotification('my notification title');
    });
    return promiseChain;
  return self.registration.showNotification("Title", {body: 'New notification.',payload})
});
/* if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  } */