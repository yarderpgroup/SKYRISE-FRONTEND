import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCwuH5di6tdog0LDzKni2wtzo6P4aJrGls",
  authDomain: "skyrise-realestate.firebaseapp.com",
  databaseURL: "https://skyrise-realestate-default-rtdb.firebaseio.com",
  projectId: "skyrise-realestate",
  storageBucket: "skyrise-realestate.appspot.com",
  messagingSenderId: "238266583552",
  appId: "1:238266583552:web:84c2086b7b09a1a1a0e6e5",
};
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const messaging: any = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();

export default messaging;
