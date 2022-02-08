import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Image,
} from "react-native";
import Menus from './Menus'
import About from '../Landing/Nested/About'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from './HomePage';
import Bible from "./Nested/Bible";
import ReadPage from "../ReadBiblePage/ReadPage";
import Event from "../Events/Event";
import AddEvent from "../Events/AddEvent";
import Notes from "./Nested/Notes";
import Note from "./Nested/Note";
import AddNote from './Nested/AddNote'
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import UpdateNote from "./Nested/UpdateNote";
import Profile_Settings from "../Profile_Seetings/Profile_Settings";
import TabNavigator from "./TabNavigator";
import Notification from '../Notification/Notification'
import ReadNotifications from "../Notification/ReadNotification";
import Location from "./Nested/Location";
import Payment from "../Payment/Payment";

const Stack = createNativeStackNavigator();

const Index = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
            <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
            <Stack.Screen name="Bible" component={Bible} options={{ headerShown: false }}/>
            <Stack.Screen name="ReadPage" component={ReadPage} options={{ headerShown: false }}/>
            <Stack.Screen name="Event" component={Event} options={{ headerShown: false }}/>
            <Stack.Screen name="Notes" component={Notes} options={{ headerShown: false }}/>
            <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
            <Stack.Screen name="UpdateNote" component={UpdateNote} options={{ headerShown: false }}/>
            <Stack.Screen name="Note" component={Note} options={{ headerShown: false }}/>
            <Stack.Screen name="AddNote" component={AddNote} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            <Stack.Screen name="AddEvent" component={AddEvent} options={{ headerShown: false }}/>
            <Stack.Screen name="Profile" component={Profile_Settings} options={{ headerShown: false }}/>
            <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
            <Stack.Screen name="ReadNotifications" component={ReadNotifications} options={{ headerShown: false }}/>
            <Stack.Screen name="Location" component={Location} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
    
    )
}

export default Index
