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
    console.log(currentNotification, "as current notification")
    const dispatch = useDispatch();
    let [notifications, setNotifications] = useState([]);
    const [acceptBtn, setAcceptBtn] = useState("Approve This Person")
    const [denyBtn, setDenyBtn] = useState("Deny This Person")

    
  // const fetchNotitifications = async() => {
  //   const res = await fetch(`https://tvccserver.vercel.app/notifications?id=${userDetails.id}`);
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

  useEffect(() => {
    // fetchNotitifications()
    // const existed = currentNotification?.addOns.find(item => {
    //   if(item.name === 'request signup emai'){
    //     console.log(item, "as item");
    //   }
    // });
  }, [])

const handleDeny = async() => {
  let emailToAuth;
  let url;
  let requestDepartment;
  let churchBranch;
  const response = "deny";
  const existed = await currentNotification?.addOns.map(item => {
    if(item.name === 'request signup email'){
      emailToAuth = item.value;
    } else if(item.name === 'request dept_join email'){
      emailToAuth = item.value;
    }
    if(currentNotification.sender === "Automatic by a user request to join department"){
      if(item.name === 'request dept_join deptName'){
        requestDepartment = item.value
      }
      if(item.name === 'request dept_join churchbranch'){
        churchBranch = item.value
      }
    }
  });
  const allProcessed = await Promise.all(existed);
  console.log(requestDepartment, "as requestDepartment")
  console.log(churchBranch, "as churchBranch")
  if(currentNotification.sender === "Automatic by a user request to join department"){
    url = `https://tvccserver.vercel.app/responseToDepartmentProposal?response=${response}&email=${emailToAuth}&departmentName=${requestDepartment}&churchBranch=${churchBranch}`
  } else {
    url = `https://tvccserver.vercel.app/signuprequestresponse?response=${response}&email=${emailToAuth}`
  }
 
  try {
    setDenyBtn("Please wait...")
    const res = await fetch(url);
    const data = await res.json();
    if(data.success === true){
      Alert.alert(`SUCCESS!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => navigation.replace("HomePage") },
      ]);
      setDenyBtn("Done!")
    } else{
      Alert.alert(`ERROR!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => navigation.replace("HomePage") },
      ]);
      setDenyBtn("Deny This Person")
    }
  } catch (error) {
    setDenyBtn("Deny This Person")
    Alert.alert(`ERROR!!!`, `An error occured.`, [
      { text: "OK", onPress: () => navigation.replace("HomePage") },
    ]);
  }

}

const handleAccept = async() => {
  let emailToAuth;
  let url;
  let requestDepartment;
  let churchBranch;
  const response = "accept";
  const existed = await currentNotification?.addOns.map(item => {
    if(item.name === 'request signup email'){
      emailToAuth = item.value;
    } else if(item.name === 'request dept_join email'){
      emailToAuth = item.value;
    }
    if(currentNotification.sender === "Automatic by a user request to join department"){
      if(item.name === 'request dept_join deptName'){
        requestDepartment = item.value
      }
      if(item.name === 'request dept_join churchbranch'){
        churchBranch = item.value
      }
    }
  });
  const allProcessed = await Promise.all(existed);
  console.log(requestDepartment, "as requestDepartment")
  console.log(churchBranch, "as churchBranch")
  if(currentNotification.sender === "Automatic by a user request to join department"){
    url = `https://tvccserver.vercel.app/responseToDepartmentProposal?response=${response}&email=${emailToAuth}&departmentName=${requestDepartment}&churchBranch=${churchBranch}`
  } else {
    url = `https://tvccserver.vercel.app/signuprequestresponse?response=${response}&email=${emailToAuth}`
  }
 
  try {
    setAcceptBtn("Please wait...")
    const res = await fetch(url);
    const data = await res.json();
    if(data.success === true){
      Alert.alert(`SUCCESS!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => navigation.replace("HomePage") },
      ]);
      setAcceptBtn("Done!")
    } 
    else{
      Alert.alert(`ERROR!!!`, `${data.message}.`, [
        { text: "OK", onPress: () => navigation.replace("HomePage") },
      ]);
      setAcceptBtn("Approve This Person")
    }
  } catch (error) {
    setAcceptBtn("Approve This Person")
    Alert.alert(`ERROR!!!`, `An error occured.`, [
      { text: "OK", onPress: () => navigation.replace("HomePage") },
    ]);
  }
}

const approveDeny = (
  <View style={styles.responseBox}>
    <TouchableOpacity onPress={handleAccept} style={styles.left}>
      <Text>{acceptBtn}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleDeny} style={styles.right}>
      <Text>{denyBtn}</Text>
    </TouchableOpacity>
  </View>
)


    return (
            <View style={styles.bodyPart}>
            {/* <Header name="My Notifications" leftSide="" /> */}
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
              currentNotification.sender === "Automatic From SignUp" || currentNotification.sender === "Automatic by a user request to join department" ? approveDeny : null
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
