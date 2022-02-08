import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Image,
} from "react-native";
import Menus from "./Menus";
import About from "../Landing/Nested/About";
import Bible from "./Nested/Bible";
import Profile_Settings from "../Profile_Seetings/Profile_Settings";
import HomePage from './HomePage';
import ReadPage from "../ReadBiblePage/ReadPage";
import Event from "../Events/Event";
import AddEvent from "../Events/AddEvent";
import Notes from "./Nested/Notes";
import Note from "./Nested/Note";
import AddNote from './Nested/AddNote'
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import UpdateNote from "./Nested/UpdateNote";
import Notification from '../Notification/Notification'
import Payment from "../Payment/Payment";

// import { createNativeTabNavigator } from "@react-navigation/native-Tab";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

// const Tab = createNativeTabNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {

  const { userDetails } = useSelector((state) => state.useTheReducer);
  return (
    <>
      <Tab.Navigator
      screenOptions={({route})=> ({
          tabBarIcon:({focused, size, color})=>{
            let iconName;
            if(route.name === "HomePage"){
                iconName = 'home';
                size = focused ? 20 : 17;
            } else if(route.name === "Bible"){
                iconName = 'bible';
                size = focused ? 20 : 17;
                color = focused ? 'brown' : 'black'
            } else if(route.name === "Event"){
                iconName = 'calendar-alt';
                size = focused ? 20 : 17;
                color = focused ? 'brown' : 'black'
            } else if(route.name === "Payment"){
                iconName = 'money-check-alt';
                size = focused ? 20 : 17;
                color = focused ? 'brown' : 'black'
            } else if(route.name === "Profile"){
                iconName = 'user-alt';
                size = focused ? 20 : 17;
                color = focused ? 'brown' : 'black'
            }else if(route.name === "Notification"){
              iconName = 'bell';
              size = focused ? 20 : 17;
              color = focused ? 'brown' : 'black'
          }
            return (
                <FontAwesome5 name={iconName} size={size} color={color}/>
            )

          }
      })}
      >
            <Tab.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
            <Tab.Screen name="Bible" component={Bible} options={{ headerShown: false }}/>
            <Tab.Screen name="Event" component={Event} options={{ headerShown: false }}/>
            <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
            <Tab.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={Profile_Settings} options={{ headerShown: false }}/>
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
