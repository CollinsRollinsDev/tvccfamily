import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

const ForgetPassword = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [codeTime, setCodeTime] = useState(false);
  const [code, setCode] = useState();
  const [btnMsg, setBtnMsg] = useState("Get Code");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPhoneFormat, setNewPhoneFormat] = useState()
  const [hintText, setHintText] = useState(
    "Please, enter your phone number tied to your account to reset password."
  );

  const handleSubmit = async () => {
    const phoneNumberLength = phoneNumber;
    const newPhoneNumber = phoneNumberLength.slice(phoneNumber.length - 10);
    let myPhoneNumber = await `${234}${newPhoneNumber}`;
    setNewPhoneFormat(myPhoneNumber);
    try {
      setBtnMsg("Sending code...Please wait..");
      const res = await fetch(
        `http://192.168.43.224:8000/forgotpasswordCode?phoneNumberTagged=${myPhoneNumber}`
      );
      const data = await res.json();
      if (data.success !== true) {
        setBtnMsg("Try Again.");
        Alert.alert(`ERROR!!!`, data.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }
      setBtnMsg("Submit Code");
      setHintText("What is the code sent? Input below for verification. ");
      setCodeTime(true);
      Alert.alert(`Great!`, data.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    } catch (error) {
      setBtnMsg("Get Code");
      Alert.alert(`Oops!`, "Something is off here!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
  };

  const handleCodeSubmission = async () => {
    if (!code) {
      Alert.alert(`Oops!`, "Did you forget about the code?", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(`Oops!`, "Your pasword is not matching!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    try {
      setBtnMsg("Processing....");
      const res = await fetch(
        `http://192.168.43.224:8000/resetpassword?code=${code}&phoneNumber=${newPhoneFormat}&newPassword=${password}`
      );
      const data = await res.json();
  // console.log(data, "as data")

      if (data.success != true) {
        setBtnMsg("failed.. Try Again.");
        Alert.alert(`Oops!`, data.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }
      setBtnMsg("Success!!!");
      Alert.alert(`Oops!`, data.message, [
        { text: "OK", onPress: () => navigation.replace("Login") },
      ]);
      return;
    } catch (error) {
      console.log(error, "as error")
      setBtnMsg("Try Again");
      Alert.alert(`Oops!`, "Something is off here!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.info}> {hintText}</Text>

      {!codeTime && (
        <TextInput
          onChangeText={(e) => setPhoneNumber(e)}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter your phone number"
          maxLength={11}
        />
      )}

      {codeTime && (
        <>
          <TextInput
            onChangeText={(e) => setCode(e)}
            style={styles.input}
            keyboardType="numeric"
            placeholder="What is the code?"
            maxLength={11} //setting limit of input
          />
          <TextInput
            onChangeText={(e) => setPassword(e)}
            style={styles.input}
            placeholder="new password"
          />
          <TextInput
            onChangeText={(e) => setConfirmPassword(e)}
            style={styles.input}
            placeholder="confirm new password"
          />
        </>
      )}

      <TouchableOpacity
        onPress={codeTime ? handleCodeSubmission : handleSubmit}
        style={styles.btn}
      >
        <Text style={styles.btnText}>{btnMsg}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgetPassword;

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
    textAlign: "center",
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
