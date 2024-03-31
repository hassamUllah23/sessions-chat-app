importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyCOZHrS3VIAhN5v9qHCZzSW5GxrUUOlPCs",
  authDomain: "convo-square.firebaseapp.com",
  projectId: "convo-square",
  storageBucket: "convo-square.appspot.com",
  messagingSenderId: "1082547370751",
  appId: "1:1082547370751:web:469f8e9fd68867fa812aca",
  measurementId: "G-3WKNLZ88B4",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const firebaseConfig = {
//   apiKey: "AIzaSyCOZHrS3VIAhN5v9qHCZzSW5GxrUUOlPCs",
//   authDomain: "convo-square.firebaseapp.com",
//   projectId: "convo-square",
//   storageBucket: "convo-square.appspot.com",
//   messagingSenderId: "1082547370751",
//   appId: "1:1082547370751:web:469f8e9fd68867fa812aca",
//   measurementId: "G-3WKNLZ88B4",
// };

// initializeApp(firebaseConfig);
// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "MY TITLE";
//   const notificationOptions = {
//     body: "MY BODY",
//     icon: null,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// export {};
