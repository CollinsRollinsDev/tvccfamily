import React from "react";
import { StyleSheet } from "react-native";
import Bible from "./Nested/Bible";
import Profile_Settings from "../Profile_Seetings/Profile_Settings";
import HomePage from "./HomePage";
import Event from "../Events/Event";
import Notification from "../Notification/Notification";
import Payment from "../Payment/Payment";

// import { createNativeTabNavigator } from "@react-navigation/native-Tab";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import betaVersion from "../../Hooks/betaVersion";

// const Tab = createNativeTabNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const { userDetails } = useSelector((state) => state.useTheReducer);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === "HomePage") {
              iconName = "home";
              size = focused ? 20 : 17;
            } else if (route.name === "Bible") {
              iconName = "bible";
              size = focused ? 20 : 17;
              color = focused ? "brown" : "black";
            } else if (route.name === "Event") {
              iconName = "calendar-alt";
              size = focused ? 20 : 17;
              color = focused ? "brown" : "black";
            } else if (route.name === "Payment") {
              iconName = "money-check-alt";
              size = focused ? 20 : 17;
              color = focused ? "brown" : "black";
            } else if (route.name === "Profile") {
              iconName = "user-alt";
              size = focused ? 20 : 17;
              color = focused ? "brown" : "black";
            } else if (route.name === "Notification") {
              iconName = "bell";
              size = focused ? 20 : 17;
              color = focused ? "brown" : "black";
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          headerMode: "screen",
          headerTintColor: "whitesmoke",
          headerStyle: { backgroundColor: "#3464eb" },
        })}
      >
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{ headerShown: false }}
        />
        {/* commented for beta version */}

        
        {/* <Tab.Screen
          name="Bible"
          component={Bible}
          options={{ title: "Bible KJV" }}
        /> */}
        {/* <Tab.Screen
          name="Event"
          component={Event}
          options={{ title: "Events" }}
        /> */}
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{ title: "Notifications" }}
        />
        {/* <Tab.Screen
          name="Payment"
          component={Payment}
          options={{ title: "Payment" }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={Profile_Settings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "whitesmoke",
  },
  upperContainer: {
    height: "40%",
    backgroundColor: "#3464eb",
    opacity: 0.8,
    position: "relative",
  },
  churchName: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  churchSlogan: {
    fontSize: 22,
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
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    // zIndex: 1
  },
});
