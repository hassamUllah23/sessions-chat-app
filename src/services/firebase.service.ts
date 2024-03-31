// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOZHrS3VIAhN5v9qHCZzSW5GxrUUOlPCs",
  authDomain: "convo-square.firebaseapp.com",
  projectId: "convo-square",
  storageBucket: "convo-square.appspot.com",
  messagingSenderId: "1082547370751",
  appId: "1:1082547370751:web:469f8e9fd68867fa812aca",
  measurementId: "G-3WKNLZ88B4",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialize messaging
const messaging = getMessaging(firebaseApp);

// initialize analytics
// const _analytics = getAnalytics(firebaseApp);

const FirebaseService = {
  firebaseApp,
  messaging,
};
export { FirebaseService };
