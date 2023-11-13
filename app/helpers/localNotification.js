import * as Notifications from 'expo-notifications';
import { useState, useRef, useEffect} from 'react';
import  Constants  from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound:true,
        shouldSetBadge:true,
        shouldShowAlert:true
    })
})

// permission request and stuffs
const Notification = () => {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
        );

        notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(
            notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        null
    );
}

// setup the local notification
const schedulePushNotification = async() => {
    const id = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Testing",
            body: "Testing",
        },
        trigger: {
            seconds : 10
        },
    });
    console.log("notif id on scheduling",id)
    return id;
}

// register 
const registerForPushNotificationsAsync = async() => {
    let token;
    // ios needs permission
    if (Constants.isDevice) {
        const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        }
        if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
        }
        token = (await Notifications.getExpoPushTokenAsync({
            // get from expo project
            projectId:'3de797b7-4a6c-4c00-a798-7eb81ea79d17'
        })).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
        lightColor: "#FF231F7C",
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
        });
    }

    return token;
}

// to cancel the notification
const cancelNotification = async(notifId) => {
    await Notifications.cancelScheduledNotificationAsync(notifId);
}

export default Notification
export {schedulePushNotification, cancelNotification}