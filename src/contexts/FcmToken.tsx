import { getToken, onMessage } from "@firebase/messaging";
import { VAPID_KEY, messaging } from "configs";
import { useEffect } from "react";

const useFCMToken = (uid: string | undefined, role?: string | undefined) => {
  // console.log('useFCMToken', uid)

  useEffect(() => {
    const isSupported = () =>
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    if (isSupported()) {
      Notification.requestPermission(async function (permission) {
        const messagingResolver = await messaging; // If the user accepts, let's create a notification
        if (permission === "granted") {
          if (uid) {
            // Get FCM Token
            await getToken(messagingResolver, {
              vapidKey: VAPID_KEY,
            })
              .then(async (fcmToken) => {
                if (fcmToken) {
                  try {
                    let formData = new FormData();
                    formData.append("fcmTokenWeb", fcmToken);
                    //update function goes here
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                  console.log("No registration token available.");
                }
              })
              .catch((err) => console.log("An error occurred ", err));
          }
        } else if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          console.log("Permission not granted");
          Notification.requestPermission();
        }
      });
    }
  }, [uid]);
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );

export default useFCMToken;
