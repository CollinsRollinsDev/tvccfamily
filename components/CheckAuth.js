import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUserDetails} from '../reduxStore/actions.js';

const CheckAuth = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const dispatch = useDispatch();

  const checkAuth = async () => {
    const item = await AsyncStorage.getItem("userProfile");
    if (item != null) {
      dispatch(setUserDetails(JSON.parse(item)));
      // setIsLoggedIn(true);
      setTimeout(() => {
        navigation.navigate("TabNavigator");
      }, 2000);
      // console.log(userDetails);
      return
    }
    navigation.navigate("Login");

  };

  useLayoutEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.body}>
          <Image
            style={styles.stretch}
            source={require("../assets/loading1.gif")}
          />
      {/* <Text>CheckAuth</Text> */}
    </View>
  )
}

export default CheckAuth

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3464eb",
  },
  stretch:{
    height:50,
    width:50
  }
})