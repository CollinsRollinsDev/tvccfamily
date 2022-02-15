import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Image,
  Platform,
} from "react-native";
import Menus from "./Menus";
import About from "../Landing/Nested/About";
import Bible from "./Nested/Bible";
import Profile_Settings from "../Profile_Seetings/Profile_Settings";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Device from "expo-device";
import * as Notifications from "expo-notifications";
import {setIsNotification} from '../../reduxStore/actions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomePage = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response?.notification.request.content.data?.path, "as content");
        if (
          response?.notification.request.content.data?.path === "notification"
        ) {
          navigation.push("Notification");
        } else {
          // console.log("not pushing");
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    // if (Device.isDevice) {
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
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token, "as token");
    try {
      const res = await fetch(
        `https://tvccserver.vercel.app/addNotificationToken?emailAddress=${userDetails.emailAddress}&token=${token}`
      );
      const data = await res.json();
      if (data.success !== true) {
        // not saved successfully to database.
        return;
      }
    } catch (error) {}
    // } else {
    //   alert('Must use physical device for Push Notifications');
    // }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const initializeNotepadlocalLibrary = async () => {
    const item = await AsyncStorage.getItem("myNotes");
    let newItem = await JSON.parse(item);
    console.log(newItem);

    if (
      newItem == null ||
      newItem.length == "undefined" ||
      newItem.length == 0
    ) {
      const myNotes = [];
      await AsyncStorage.setItem("myNotes", JSON.stringify(myNotes));
    }
  };

  useEffect(() => {
    initializeNotepadlocalLibrary();
  }, []);

  const { userDetails, isNotification } = useSelector((state) => state.useTheReducer);
  const dispatch = useDispatch();
  const checkforNotification = async() => {
    try {
      const res = await fetch(`https://tvccserver.vercel.app/checkNotification?emailAddress=${userDetails.emailAddress}`);
      const {isThereNotification} = await res.json();
      dispatch(setIsNotification(isThereNotification))
    } catch (error) {
      
    }
  }
  useEffect(() => {
    // const x = setInterval(() => {
      userDetails?.emailAddress && checkforNotification();
    // }, 5000);
    // return () => {
    //   x
    // }
  }, [])
  
  return (
    <>
      <View style={styles.body}>
        <View style={styles.upperContainer}>
          <Text style={styles.welcome}>
            {userDetails.firstName} {userDetails.lastName}
          </Text>
          <View style={styles.churchText}>
            <Text style={styles.churchName}>Truevine Christian Centre</Text>
            <Text style={styles.churchSlogan}>Mount of Grace and Glory</Text>
          </View>

          <View style={styles.imgView}>
            <Image
              style={styles.stretch}
              // source={require("../../assets/study.jpg")}
              source={require("../../assets/tester.jpg")}
            />
          </View>

          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>

        <Menus navigation={navigation} />
      </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  body: {
    paddingTop:30,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "whitesmoke",
  },
  upperContainer: {
    height: "40%",
    backgroundColor: "#121212",
    opacity: 0.9,
    position: "relative",
  },
  churchName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  churchSlogan: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 25,
  },
  stretch: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  imgView: {
    zIndex: -1,
    opacity: 0.3,
  },
  logo: {
    height: 120,
    width: 120,
    position: "absolute",
    top: "25%",
    left: "5%",
    // opacity: 0.8,
  },
  churchText: {
    height: 110,
    width: "58%",
    backgroundColor: "transparent",
    position: "absolute",
    top: "30%",
    right: "1%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  welcome: {
    backgroundColor: "transparent",
    position: "absolute",
    marginLeft: "2%",
    marginTop:'2%',
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    // zIndex: 1
  },
});
