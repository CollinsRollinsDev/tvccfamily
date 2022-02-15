import React from "react";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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
} from "react-native";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [churchBranch, setChurchBranch] = useState("lagos_branch");
  const [userRole, setUserRole] = useState();
  let [userDepartment, setuserDepartment] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [btnMsg, setBtnMsg] = useState("Create My Account");
  const [isExco, setIsExco] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [code, setCode] = useState();

  const deptToggle =
    userRole == "worker" ? (
      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={userDepartment}
          onValueChange={(itemValue, itemIndex) => setuserDepartment(itemValue)}
        >
          <Picker.Item label="Choose Your Department" value="" />
          <Picker.Item
            label="Ministers Department"
            value="ministers_department"
          />
          <Picker.Item
            label="Ushering Department"
            value="ushering_department"
          />
          <Picker.Item label="Choir Department" value="choir_department" />
          <Picker.Item label="Media Department" value="media_department" />
        </Picker>
      </View>
    ) : null;

    const validateEmail = async() => {
      if (
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !userRole ||
        userRole == "" ||
        !emailAddress ||
        churchBranch == ''
      ){
        Alert.alert(
          `ERROR!!!`,
          `It seems you are mising something. Please check the information provided and try again`,
          [
            //   {
            //     text: "Cancel",
            //     onPress: () => console.log("Cancel Pressed"),
            //     style: "cancel"
            //   },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert(`ERROR!!!`, `Sorry, mismatched credentials!`, [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel"
          //   },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }
      try {
        setBtnMsg("Registering, please wait...");
        const res = await fetch("https://tvccserver.vercel.app/validateemail", {
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            phoneNumber: phoneNumber,
            userRole: userRole,
            password: password,
            churchBranch: churchBranch,
            emailAddress: emailAddress,
            userDepartment:
              userRole == "member"
                ? (userDepartment = null)
                : (userDepartment = {
                    exco: isExco,
                    deptName: userDepartment,
                    churchBranch,
                  }),
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json()
        if(data.message !== 'message is on its way!'){
          console.log(data.message)
            // setSignupbtnEnabler(false)
            setBtnMsg("Sign Up")
            alert(data.message)
           return;
        } 
        setShowConfirm(true)
        setBtnMsg("Proceed to sign up")
        return 

      } catch (error) {
        
      }
    }

  const handleSubmit = async () => {
    if(!code){
      Alert.alert(
        `ERROR!!!`,
        `Input Code And Try Again.`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
      return;
    }
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !userRole ||
      userRole == "" ||
      !emailAddress ||
      churchBranch == ''
    ) {
      // if(!firstName){

      Alert.alert(
        `ERROR!!!`,
        `It seems you are mising something. Please check the information provided and try again`,
        [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel"
          //   },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
      return;
    } else {
      if (password !== confirmPassword) {
        Alert.alert(`ERROR!!!`, `Sorry, mismatched credentials!`, [
          //   {
          //     text: "Cancel",
          //     onPress: () => console.log("Cancel Pressed"),
          //     style: "cancel"
          //   },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      } else {

          try {
            
        setBtnMsg("Registering, please wait...");
        const res = await fetch(`https://tvccserver.vercel.app/signup?code=${code}`, {
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            fullName: `${firstName} ${lastName}`,
            phoneNumber: phoneNumber,
            userRole: userRole,
            password: password,
            churchBranch: churchBranch,
            emailAddress: emailAddress,
            userDepartment:
              userRole == "member"
                ? (userDepartment = null)
                : (userDepartment = {
                    exco: isExco,
                    deptName: userDepartment,
                    churchBranch,
                  }),
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const result = await res.json();

        if (result.success === true) {
          //  router.push("/login")
          Alert.alert(`CONGRATULATIONS!!!`, `${JSON.stringify(result.message)}`, [
            {
              text: "OK",
              onPress: () =>
                navigation.replace("Login")
            },
          ]);
          setBtnMsg("Login success");
          return;
        }
        Alert.alert(`ERROR!!!`, `${JSON.stringify(result.message)}`, [
          {
            text: "OK",
            onPress: () =>
              console.log('')
          },
        ]);
        setBtnMsg("Proceed to sign up");
        return;
          } catch (error) {
            Alert.alert(`ERROR!!!`, `Internal Server Error. Please try again later.`, [
              {
                text: "OK",
                onPress: () =>
                  console.log('')
              },
            ]);
            setShowConfirm(false);
              setBtnMsg("Sign Up");
              console.log(error)

          }
      }
    }
  };

  const showConfirmArea = (
    <View style={styles.confirmArea}>
         <Text style={styles.info}>
            {" "}
              One more step, Check your inbox and put code here.
          </Text>
          <TextInput
            onChangeText={(e) => setCode(e)}
            style={styles.confirmInput}
            keyboardType='numeric'
            underlineColorAndroid='transparent'
            placeholder="What's the code?"
          />
           <TouchableOpacity onPress={handleSubmit} style={styles.Confirmbtn}>
            <Text style={styles.ConfirmbtnText}>{btnMsg}</Text>
          </TouchableOpacity>
    </View>
  )

  if(showConfirm){
    return showConfirmArea
  }

  return (
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.container}>
          <Text style={styles.info}>
            {" "}
            Welcome to TVCC. Please, Sign up below.
          </Text>
          <TextInput
            onChangeText={(e) => setFirstName(e)}
            style={styles.input}
            placeholder="First Name"
          />
          <TextInput
            onChangeText={(e) => setLastName(e)}
            style={styles.input}
            placeholder="Last Name"
          />
          <TextInput
            onChangeText={(e) => setPhoneNumber(e)}
            style={styles.input}
            placeholder="Phone Number"
          />
          <TextInput
            onChangeText={(e) => setEmailAddress(e)}
            style={styles.input}
            placeholder="Email Address"
          />

           <View style={styles.roleBox}>
            <Picker
              style={styles.role}
              selectedValue={churchBranch}
              onValueChange={(itemValue, itemIndex) => setChurchBranch(itemValue)}
            >
              <Picker.Item label="Church Branch" value="" />
              <Picker.Item label="Lagos Branch" value="lagos_branch" />
              <Picker.Item label="Benin HeadQuater" value="benin_headquater" />
            </Picker>
          </View>

          <View style={styles.roleBox}>
            <Picker
              style={styles.role}
              selectedValue={userRole}
              onValueChange={(itemValue, itemIndex) => setUserRole(itemValue)}
            >
              <Picker.Item label="Role" value="" />
              <Picker.Item label="Member" value="member" />
              <Picker.Item label="Worker" value="worker" />
            </Picker>
          </View>

          {deptToggle}

          <TextInput
            onChangeText={(e) => setPassword(e)}
            style={styles.input}
            placeholder="Password"
          />
          <TextInput
            onChangeText={(e) => setConfirmPassword(e)}
            style={styles.input}
            placeholder="Confirm Password"
          />
          <TouchableOpacity onPress={validateEmail} style={styles.btn}>
            <Text style={styles.btnText}>{btnMsg}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.push("Login")}
            style={styles.alt}
          >
            <Text style={styles.altClick}>
              Already have an account? Sign In!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3464eb",
    minHeight: "100%",
    marginBottom: 50,
  },
  container: {
    width: "100%",
    padding: "2%",
    marginTop: "5%",
    // height: 'fit-content',
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    marginLeft: "10%",
    height: 40,
    marginTop: 40,
    paddingLeft: 10,
    borderRadius: 10,
  },
  info: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  roleBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    marginLeft: "10%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    // alignItems: 'center'
  },
  role: {
    textAlign: "center",
    fontSize: 17,
    color: "black",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    marginLeft: "10%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
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
  confirmArea:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3464eb",
    minHeight: "100%",
    marginBottom: 50,
  },
  confirmInput:{
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginTop: 40,
    paddingLeft: 10,
    borderRadius: 10,
  },
  ConfirmbtnText:{
    fontSize: 17,
    color: "black",
  },
  Confirmbtn:{
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    alignItems: "center",
  },
});
