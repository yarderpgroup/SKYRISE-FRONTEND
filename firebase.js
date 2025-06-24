import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyCwuH5di6tdog0LDzKni2wtzo6P4aJrGls",
  authDomain: "skyrise-realestate.firebaseapp.com",
  databaseURL: "https://skyrise-realestate-default-rtdb.firebaseio.com",
  projectId: "skyrise-realestate",
  storageBucket: "skyrise-realestate.appspot.com",
  messagingSenderId: "238266583552",
  appId: "1:238266583552:web:84c2086b7b09a1a1a0e6e5",
};

if (typeof window !== "undefined" && !firebase?.apps?.length) {
  firebase?.initializeApp(firebaseConfig);
}

export const messaging = firebase?.messaging();
