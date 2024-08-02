import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee, { AndroidImportance } from "@notifee/react-native";
import store from "../../redux/store";
import { notificationActions } from "../../redux/actions/combineAction";
import { navigationRef } from "../../navigation/navigationService";
import { routes } from "../../navigation/routes";

export const onDisplayNotification = async (remoteMessage: any) => {
  // console.log(remoteMessage, "messagre----------");
  await notifee.requestPermission();
  notifee.onBackgroundEvent(async (e) => {
    // console.log(e, "-----------");
    navigationRef.navigate(routes.notificaion.list);
  });

  const remoteMessageResponse = remoteMessage?.notification;
  const channelId = await notifee.createChannel({
    id: "com.enverify",
    name: "com.enverify",
    importance: AndroidImportance.HIGH,
  });
  // Display a notification

  await notifee.displayNotification({
    title: remoteMessageResponse?.title ?? "",
    body: remoteMessageResponse?.body ?? "",
    android: {
      channelId,
      smallIcon: "appicon", // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      largeIcon: !!remoteMessageResponse?.android?.imageUrl
        ? remoteMessageResponse?.android?.imageUrl
        : "appicon",
      pressAction: {
        id: "default",
      },
    },
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
  });

  store.dispatch(notificationActions.getNotification());
};

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
    console.log("Authorization status:", authStatus);
  }
}

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem("@fcmToken");
  console.log("the old token", checkToken);
  if (!!!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (!!fcmToken) {
        await AsyncStorage.setItem("@fcmToken", fcmToken);
      }
    } catch (error) {
      console.log(error, "fcmtoekn error");
    }
  }
};

export const notificationListener = async () => {
  // messaging().onMessage(async remoteMessage =>
  //   Alert.alert(
  //     remoteMessage?.notification?.title ?? '',
  //     remoteMessage?.notification?.body,
  //     [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  //   )
  // );

  messaging().onMessage(onDisplayNotification); // forground
  messaging().setBackgroundMessageHandler(onDisplayNotification); //background

  messaging().onNotificationOpenedApp((remoteMessage: any) => {
    console.log(remoteMessage, "open++++++");
    navigationRef.navigate(routes.notificaion.list);
  });
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        // setTimeout(() => {
        //   navigationRef.navigate(routes.notificaion.list);
        // }, 1000);
        console.log(remoteMessage, "here=====");
      }
    });
};

export const subscribeToTopic = (topicName: string) => {
  messaging().subscribeToTopic(topicName);
};

export const unSubscribeToTopic = (topicName: string) => {
  messaging().unsubscribeFromTopic(topicName);
};
