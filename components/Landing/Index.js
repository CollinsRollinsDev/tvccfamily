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
import Admin from "../Admin/Admin";
import AssignLeader from "../Admin/AssignLeader";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
const Index = () => {
    const { currentBook, currentChapter, currentVerse, currentScripture } =
    useSelector((state) => state.useTheReducer);

    let currentPickedBook = "Loading...";
    if(currentBook && currentChapter){
        currentPickedBook = `${currentBook} chapter ${currentChapter}`
    } else{
        currentPickedBook = "Loading..."
    }

    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'whitesmoke',
        headerStyle: { backgroundColor: '#3464eb' },
      }}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }}/>
            <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
            <Stack.Screen name="About" component={About} options={{ title: "About Us"}}/>
            <Stack.Screen name="Bible" component={Bible} options={{ title: "Bible KJV"}}/>
            <Stack.Screen name="ReadPage" component={ReadPage} options={{ title:currentPickedBook}}/>
            <Stack.Screen name="Event" component={Event} options={{ title:"Events"}}/>
            <Stack.Screen name="Notes" component={Notes}  options={{ title:"Notes"}}/>
            <Stack.Screen name="Payment" component={Payment}  options={{ title:"Payment"}}/>
            <Stack.Screen name="UpdateNote" component={UpdateNote}  options={{ title:"Update Note"}}/>
            <Stack.Screen name="Note" component={Note}  options={{ title:"Note"}}/>
            <Stack.Screen name="AddNote" component={AddNote}  options={{ title:"Add a note"}}/>
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }}/>
            <Stack.Screen name="AssignLeader" component={AssignLeader} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register}  options={{ title:"Register"}}/>
            <Stack.Screen name="AddEvent" component={AddEvent} options={{title:'Add an event'}}/>
            <Stack.Screen name="Profile" component={Profile_Settings} options={{ headerShown: false }}/>
            <Stack.Screen name="Notification" component={Notification} options={{title:"Notifications"}}/>
            <Stack.Screen name="ReadNotifications" component={ReadNotifications} options={{ title:'My Notifications' }}/>
            <Stack.Screen name="Location" component={Location} options={{ title: "Location"}}/>
        </Stack.Navigator>
    </NavigationContainer>
    
    )
}

export default Index
