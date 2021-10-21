import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  LogBox,
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../reduxStore/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReadNotifications = ({navigation}) => {
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
  
    const { userDetails, currentNotification } = useSelector((state) => state.useTheReducer);
    const dispatch = useDispatch();
    let [notifications, setNotifications] = useState([]);

    
  // const fetchNotitifications = async() => {
  //   const res = await fetch(`http://192.168.43.37:8080/notifications?id=${userDetails.id}`);
  //   const data = await res.json();
  //   if(data.success === true){
  //     console.log(data.response)
  //     await setNotifications(notifications = data.response.reverse())
  //     console.log("notifications:", notifications)
  //   } else{
  //     Alert.alert(`ERROR!!!`, `${data.response}.`, [
  //       { text: "OK", onPress: () => console.log("OK Pressed") },
  //     ]);
  //   }
  // }

//   useEffect(() => {
//     fetchNotitifications()
//   }, [])

const handleDeny = async() => {
  const response = "deny";
  try {
    const res = await fetch(`http://192.168.43.37:8080/signuprequestresponse?response=${response}&email=angela@gmail.com`);
    const data = await res.json();
    if(data.success === true){
      Alert.alert(`SUCCESS!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else{
      Alert.alert(`ERROR!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  } catch (error) {
    console.log("Server or Client error occurred!" + error)
  }

}

const handleAccept = async() => {
  const response = "accept";
  try {
    const res = await fetch(`http://192.168.43.37:8080/signuprequestresponse?response=${response}&email=angela@gmail.com`);
    const data = await res.json();
    if(data.success === true){
      Alert.alert(`SUCCESS!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } 
    else{
      Alert.alert(`ERROR!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  } catch (error) {
    console.log("Server or Client error occurred!" + error)
  }
}

const approveDeny = (
  <View style={styles.responseBox}>
    <TouchableOpacity onPress={handleAccept} style={styles.left}>
      <Text>Approve This Person</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleDeny} style={styles.right}>
      <Text>Deny This Person</Text>
    </TouchableOpacity>
  </View>
)


    return (
            <View style={styles.bodyPart}>
            <Header name="My Notifications" leftSide="" />
        <ScrollView    refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.noteArea}>
           <View style={styles.head}>
             <Text style={styles.headText}>{currentNotification.heading}</Text>
           </View>
           <View style={styles.reason}>
             <Text style={styles.reasonText}>{currentNotification.sender}</Text>
           </View>

            <View style={styles.main}>
              <Text style={styles.mainText}>{currentNotification.message}</Text>
            </View>

            {
              currentNotification.sender === "Automatic From SignUp" ? approveDeny : null
            }

        </View>

        </ScrollView>

            </View>
    )
}

export default ReadNotifications

const styles = StyleSheet.create({
    bodyPart:{
        height: '60%',
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#3464eb',
        padding: "2%",
      },
      noteArea:{
        padding: '1%'
      },
      head:{
        width: '100%',
        height: 30,
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headText:{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      reason:{
        width: '100%',
        height: 20,
        margin: '2%',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      reasonText:{
        fontSize: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        textDecorationStyle: 'dotted'
      },
      main:{
        width: '100%',
        height: 50,
        margin: '2%',
        marginBottom: 50,
      },
      mainText:{
        fontSize: 16,
        color: 'whitesmoke',
      },
      responseBox:{
        marginTop: 50,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems: 'center'
      },
      left:{
        padding: '4%',
        backgroundColor: 'white' ,    
       },
       right:{
        padding: '4%',
        backgroundColor: 'white' 
       },
})
