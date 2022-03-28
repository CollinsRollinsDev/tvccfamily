import React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../reduxStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.useTheReducer);

  // console.log(userDetails);

  const [refreshing, setRefreshing] = useState(false);
  const [btnMsg, setBtnMsg] = useState("Login");
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleSubmit = async () => {
    if (!emailAddress || !password) {
      Alert.alert(`ERROR!!!`, `Please, Provide login details`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setBtnMsg("Authenticating...");
      const res = await fetch("https://tvccserver.vercel.app/signin", {
        body: JSON.stringify({
          emailAddress: emailAddress,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await res.json();

      if (data.success == true) {
        let user_data = data.details;
        // console.log("userId from login page:", user_data.id);
        await AsyncStorage.setItem("userProfile", JSON.stringify(user_data));
        dispatch(setUserDetails(user_data));
        //     // console.log(user_data)
        setBtnMsg("Access Granted. Redirecting...");

        Alert.alert(
          `ACCESS GRANTED!!!`,
          `Welcome ${user_data.firstName} ${user_data.lastName}`,
          [{ text: "OK", onPress: () => navigation.replace("TabNavigator") }]
          // [{ text: "OK", onPress: () => navigation.push("TabNavigator") }]
        );
      } else {
        setBtnMsg("Sign In");
        Alert.alert(`ERROR!!!`, `Something went wrong`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  // const checkAuth = async () => {
  //   const item = await AsyncStorage.getItem("userProfile");
  //   if (item != null) {
  //     dispatch(setUserDetails(JSON.parse(item)));
  //     navigation.navigate("TabNavigator");
  //     // console.log(userDetails);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // expo install @react-native-async-storage/async-storage

  return (
    <View style={styles.body}>
      {/* <ScrollView
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
            >
             */}
      <Text style={styles.info}> Please, Login below</Text>
      <TextInput
        onChangeText={(e) => setEmailAddress(e)}
        style={styles.input}
        placeholder="email address"
      />
      <TextInput
        secureTextEntry
        autoCorrect={false}
        onChangeText={(e) => setPassword(e)}
        style={styles.input}
        placeholder="password"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={styles.btnText}>{btnMsg}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push("Register")}
        style={styles.alt}
      >
        <Text style={styles.altClick}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
      {/* <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          /> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3464eb",
  },
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 50,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 10,
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 50,
    justifyContent: "center",
    marginTop: 50,
    alignItems: "center",
  },
  btnText: {
    fontSize: 17,
    color: "black",
  },
  alt: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 30,
  },
  altClick: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
