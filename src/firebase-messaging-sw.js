
importScripts("https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js")
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js')
firebase.initializeApp({
  apiKey: "AIzaSyDwMP1toW3zPXPSXQhpjHWVjMf3JXL9Izk",
  authDomain: "trasportostudenti-bc19c.firebaseapp.com",
  projectId: "trasportostudenti-bc19c",
  storageBucket: "trasportostudenti-bc19c.appspot.com",
  messagingSenderId: "813391950081",
  appId: "1:813391950081:web:54cb8726ce802935cc2b00",
  measurementId: "G-4T3GBJ05WS",
  databaseURL: "https://trasportostudenti-bc19c-default-rtdb.europe-west1.firebasedatabase.app"
})
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