import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../reduxStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentNotification } from "../../reduxStore/actions";

const Notification = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const { userDetails, currentNotification } = useSelector(
    (state) => state.useTheReducer
  );
  const dispatch = useDispatch();
  let [notifications, setNotifications] = useState([]);

  const fetchNotitifications = async () => {
    const res = await fetch(
      `https://tvccserver.vercel.app/notifications?id=${userDetails.id}`
    );
    const data = await res.json();
    if (data.success === true) {
      console.log(data.response);
      await setNotifications((notifications = data.response.reverse()));
      console.log("notifications:", notifications);
    } else {
      Alert.alert(`ERROR!!!`, `${data.response}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    // const item = await AsyncStorage.getItem("myNotes");
    // setNotes(JSON.parse(item));
    // console.log("notes",notes)
  };

  useEffect(() => {
    fetchNotitifications();
  }, []);

  const handlePress = async (heading, sender, message, id, addOns) => {
    let currentNotification = {
      heading,
      sender,
      message,
      addOns,
    };
    await dispatch(setCurrentNotification(currentNotification));
    // set notification to read!
    try {
      const res = await fetch(
        `https://tvccserver.vercel.app/notifications/readnotification?id=${userDetails.id}&notificationId=${id}`
      );
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const notify = notifications.map((notification, index) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          await handlePress(
            notification.heading,
            notification.sender,
            notification.message,
            notification._id,
            notification?.addOns
          );
          navigation.push("ReadNotifications");
        }}
        key={index}
        style={styles.card}
      >
        <Text style={styles.heading}>{notification.heading}</Text>
        <Text style={styles.message}>
          {notification.message.substring(0, 70) + "..."}
        </Text>
        {notification.isRead == false ? (
          <View style={styles.isReadDot}></View>
        ) : null}
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.bodyPart}>
      {/* <Header name="Notification" leftSide="" /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardEnv}>{notify}</View>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  bodyPart: {
    height: "60%",
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#3464eb",
  },
  cardEnv: {
    height: "auto",
    width: "100%",
    padding: "2%",
    // backgroundColor: 'grey'
  },
  card: {
    minHeight: 70,
    width: "100%",
    padding: "2%",
    marginTop: 10,
    backgroundColor: "white",
  },
  heading: {
    color: "green",
    fontWeight: "bold",
    fontSize: 16,
  },
  isReadDot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
    top: "-5%",
    right: 0,
  },
});
