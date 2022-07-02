import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import betaVersion from "../../../Hooks/betaVersion.js";
import * as Speech from "expo-speech";

const AddNumberForTextMsg = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [name, setName] = useState('');
  const [btnMsg, setBtnMsg] = useState('Add Number');
  const welcomeSpeech = () => {
    const thingToSay =
      "Hi, you can put in number of new comers or preferred members here. I will handle the text message to be sent to them occasionally.";
    Speech.speak(thingToSay, {
      rate: 0.8,
      pitch: 0.7,
    });
  };

  useLayoutEffect(() => {
    // welcomeSpeech();
  }, []);

  const handleSubmit = async() => {
    if(!name || !phoneNumber){
        Alert.alert(`ERROR!!!`, `Please, Provide details`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          return;
    }
    setBtnMsg("Adding....")
    try {
        const res = await fetch(`http://192.168.43.224:8000/ai/addProfile`, {
        method:"POST",
        body:JSON.stringify({
            phoneNumber:phoneNumber.trim(),
            name
        }),
        headers: {
            "Content-Type": "application/json",
          },
    });
    const data = await res.json();
    if(data?.success == false){
        Alert.alert(`ERROR!!!`, `${data?.message}`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          setBtnMsg("Add Number")
          return;
    }
    setBtnMsg("Success!")
    console.log(data?.success, "as data coming in")
    } catch (error) {
        console.log(error, "As error")
        setBtnMsg("Add Number")
    }
  }

  // for beta state
  const [items, setItems] = React.useState([
    { name: "Add phone number to automate text message for.", path: "" },
    // { name: "Assign Deputy Leader To Group", path: "" },
    // { name: "Send Message To All Members", path: "SendSms" },
  ]);
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>Let's get the number below.</Text>
      <TextInput
        onChangeText={(e) => setName(e)}
        style={styles.input}
        placeholder="Enter Person full name"
        maxLength={11}
      />
      <TextInput
        onChangeText={(e) => setPhoneNumber(e)}
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter phone number"
        maxLength={11}
      />
       <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <Text style={styles.btnText}>{btnMsg}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNumberForTextMsg;

const styles = StyleSheet.create({
  body: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3464eb",
    minHeight: "100%",
    marginBottom: 50,
    paddingTop: 40,
  },
  heading1: {
    fontSize: 17,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 50,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 10,
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
});
