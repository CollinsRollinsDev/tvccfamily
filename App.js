import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Platform 
} from "react-native";
import { useState, useEffect } from "react";
import Lunch from "./components/Lunch/Lunch.js";
import Login from "./components/Auth/Login";
import HomePage from "./components/Landing/HomePage.js";
import About from "./components/Landing/Nested/About.js";
import Bible from "./components/Landing/Nested/Bible.js";
import ReadPage from "./components/ReadBiblePage/ReadPage.js";
import { Provider } from "react-redux";
import { Store } from "./reduxStore/store.js";
import Index from "./components/Landing/Index";
import Event from "./components/Events/Event.js";
import Notes from "./components/Landing/Nested/Notes.js";
import Register from "./components/Auth/Register.js";
import AddEvent from "./components/Events/AddEvent.js";
import UpdateNote from "./components/Landing/Nested/UpdateNote.js";
import Profile_Settings from "./components/Profile_Seetings/Profile_Settings.js";
import ReadNotifications from "./components/Notification/ReadNotification";
import Location from "./components/Landing/Nested/Location.js";


export default function App() {

  return (
    <Provider store={Store}>
      <View style={styles.main}>
        {/* <Lunch /> */}
        {/* <Login /> */}
        {/* <HomePage /> */}
        {/* <About /> */}
        {/* <Bible /> */}
        {/* <ReadPage /> */}
        {/* <Event /> */}
        {/* <Notes /> */}
        {/* <AddEvent /> */}
        {/* <UpdateNote/> */}
        <Index />
        {/* <Location />         */}
        {/* <ReadNotifications /> */}
        {/* <Register /> */}
        {/* <Profile_Settings /> */}
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
  },
});
