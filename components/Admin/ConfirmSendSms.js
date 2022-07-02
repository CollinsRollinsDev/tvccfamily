import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Textarea from "react-native-textarea";

const ConfirmSendSms = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.useTheReducer);
  const [btnMsg, setBtnMsg] = useState("Send");
  const [liquid, setLiquid] = useState("Getting");

  const { selectedPeople } = route.params;
  const [sender, setSender] = useState(userDetails?.firstName);
  const [signature, setSignature] = useState();
  const [message, setMessage] = useState("");
  const [newContactNumbers, setNewContactNumbers] = useState([]);

    const getLiquid = async() => {
      try {
        const res = await fetch(`http://192.168.43.224:8000/handleSms`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();
      if (data.success != true) {
        setLiquid("Error while fetching liquid");
        return;
      }
      setLiquid(data.data);
      return;

      } catch (error) {
        setLiquid("Error while fetching liquid");
      }
    }

    useLayoutEffect(() => {
      const unsub = getLiquid()
      return () => {
        unsub
      };
    }, [])

  const sendMessage = async () => {
    if (selectedPeople.length == 0) {
      Alert.alert(`ERROR!!!`, `Contacts Selected Is Zero`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    if (!message) {
      Alert.alert(`ERROR!!!`, `Important Input Missing`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    if (!sender) {
      Alert.alert(`OOPS!!`, `We are not ready yet`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    // check if liquid is enough to send to numbers of selected contacts.
    const possibleSms = Math.floor(liquid / 1.9);
    const smsToSend = (selectedPeople.length * 1.9 + 5);
    if(smsToSend > possibleSms){
      Alert.alert(`OOPS!!`, `Not enough liquid to send to ${selectedPeople.length} people. Buy some liquid if you wish to proceed.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    setBtnMsg("Sending");
    // extract all numbers from contacts selected
    const extraction = selectedPeople.map(async (person) => {
      let toReplace = person.phoneNumbers[0].number
        .toString()
        .replace(/\s+/g, "");
      toReplace = toReplace.trim().replace("+", "");
      toReplace = toReplace.trim().replace("*", "");
      toReplace = toReplace.trim().replace("#", "");
      toReplace = toReplace.trim().replace("-", "");
      await setNewContactNumbers([]);
      newContactNumbers.push(toReplace);
      return;
    });

    const wait = await Promise.all(extraction);
    try {
      console.log(message)
      console.log(sender)
      console.log(newContactNumbers)
      const res = await fetch(`http://192.168.43.224:8000/handleSms`, {
        body: JSON.stringify({
          message,
          sender,
          contacts: newContactNumbers,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await res.json();
      if (data.success != true) {
        Alert.alert(`Opps!`, `${data.message}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setBtnMsg("Error to");
        return;
      }
      setBtnMsg("Sent");
      Alert.alert(`Hurray!`, `${data.message}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      const waitForRefresh = await getLiquid();
      return;
    } catch (error) {
      Alert.alert(`Sad!`, `Something went wrong.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      setBtnMsg("Send");
      return;
    }
  };

  // console.log(userDetails?.firstName, "as selected people")
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>Fill the form below to send your sms.</Text>

      {/* <TextInput
        onChangeText={(e) => setSignature(e)}
        style={styles.input}
        placeholder="Signature"
      /> */}
      {/* <ScrollView contentContainerStyle={{minWidth:'100%'}}> */}

      <Textarea
        containerStyle={styles.textareaContainer}
        style={styles.inputPost}
        onChangeText={(e) => setMessage(e)}
        // defaultValue={"here"}
        maxLength={140}
        placeholder={"type message..."}
        placeholderTextColor={"#5661db"}
        underlineColorAndroid={"transparent"}
        // numberOfLines={2}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.btn1}>
        <Text style={styles.btn1Text}>
          {btnMsg} Message to {selectedPeople.length} Contacts
        </Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
      <View style={styles.liquidDetails}>
        <Text style={styles.liquidText}>
          Sms Liquid:
        </Text>
        <Text style={styles.liquidText}>
          {liquid} Liquid
        </Text>
      </View>

      <View style={styles.liquidDetails}>
        <Text style={styles.liquidText}>
          Possible SMS:
        </Text>
        <Text style={styles.liquidText}>
          {Math.floor(liquid / 1.9)}
        </Text>
      </View>
    </View>
  );
};

export default ConfirmSendSms;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3464eb",
    // minHeight: "100%",
    paddingBottom: 150,
    // paddingTop: 40,
    // width:"100%",
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
  inputPost: {
    backgroundColor: "white",
    width: "100%",
    minHeight: 200,
    textAlign: "left",
    textAlignVertical: "top",
    fontSize: 16,
    marginTop: 20,
    padding: 10,
  },
  btn1: {
    height: 40,
    width: "auto",
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 80,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn1Text: {
    color: "#3464eb",
    fontWeight: "700",
  },
  liquidDetails:{
    height: 40,
    width: "100%",
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
    flexDirection:'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  liquidText:{
    fontSize:14,
    color:'white',
  }
});
