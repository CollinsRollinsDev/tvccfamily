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
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
import Bible from "./Nested/Bible";
import ReadPage from '../ReadBiblePage/ReadPage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from "react-redux";
// const Stack = createNativeStackNavigator();


const Menus = ({navigation}) => {
  const {isNotification } = useSelector((state) => state.useTheReducer);
    return (
      

        <ScrollView>
        <View style={styles.bodyMenus}>
          
            <TouchableOpacity onPress={() => navigation.push("About")} style={styles.menu}>
            <FontAwesome5 name={'church'} size={18} color={'white'}/> 
            <Text style={styles.content}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("Location")} style={styles.menu}>
            <FontAwesome5 name={'map-marker-alt'} size={18} color={'white'}/>
                <Text style={styles.content}>Location</Text>
            </TouchableOpacity>
{/* 
            <TouchableOpacity style={styles.menu}>
            <FontAwesome5 name={'book-reader'} size={18} color={'white'}/>
                <Text style={styles.content}>Word Bliss</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.push("Notes")} style={styles.menu}>
            <FontAwesome5 name={'sticky-note'} size={18} color={'white'}/>
                <Text style={styles.content}>Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("Bible")}  style={styles.menu}>
            <FontAwesome5 name={'bible'} size={18} color={'white'}/>
                <Text style={styles.content}>Bible</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("HymnSelect")}  style={styles.menu}>
            <FontAwesome5 name={'music'} size={18} color={'white'}/>
                <Text style={styles.content}>Hymn Book</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.menu}>
            <FontAwesome5 name={'play'} size={18} color={'white'}/>
                <Text style={styles.content}>Sermon/Word of God</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => navigation.push("Event")}  style={styles.menu}>
            <FontAwesome5 name={'calendar-check'} size={18} color={'white'}/>
                <Text style={styles.content}>Events</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("Notification")}  style={styles.menu}>
             {isNotification && <View style={styles.dot}></View>}
            <FontAwesome5 name={'bell'} size={18} color={'white'}/>
                <Text style={styles.content}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("Profile")} style={styles.menu}>
            <FontAwesome5 name={'user-cog'} size={18} color={'white'}/>
                <Text style={styles.content}>Settings/Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.push("Admin")} style={styles.menu}>
            <FontAwesome5 name={'superpowers'} size={18} color={'white'}/>
                <Text style={styles.content}>Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                  Alert.alert(
                    `Message`,
                    `Are you sure you wish to logout?`,
                    [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                      { text: "OK", onPress: async() => {
                        await AsyncStorage.removeItem("userProfile");
                        navigation.navigate("Login")
                      } },
                    ]
                  );
            }} style={styles.menu}>
              <FontAwesome5 name={'sign-out-alt'} size={18} color={'white'}/>          
                <Text style={styles.content}>Logout</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

export default Menus

const styles = StyleSheet.create({
    bodyMenus:{
        height: '60%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#3464eb'
      },
      menu:{
        height: 60,
        backgroundColor:'transparent',
        width: '100%',
        borderWidth: 1,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: '#c9c3c1',
        paddingLeft: '5%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        position:'relative'
      },
      dot:{
        height:10,
        width:10,
        borderRadius:30,
        backgroundColor:'red',
        position:'absolute',
        top:10,
        right:10
      },
      content: {
        fontSize: 21,
        color: 'whitesmoke',
        marginLeft: '5%'

      }
})
