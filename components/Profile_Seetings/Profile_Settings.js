import React from "react";
import { useState, useEffect, useCallback } from "react";
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
  CustomButton,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../reduxStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const Profile_Settings = () => {
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

  const { userDetails } = useSelector((state) => state.useTheReducer);
  const dispatch = useDispatch();

  const [editable, setEditable] = useState(false);
  const [editableText, setEditableText] = useState("Edit Profile");
  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [email, setEmail] = useState(userDetails.emailAddress);
  const [phoneNumber, setPhoneNumber] = useState(userDetails.phoneNumber);
  const [userRole, setUserRole] = useState(userDetails.userRole);
  const [password, setPassword] = useState();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [requestingDept, setRequestingDept] = useState();
  const [btnMsg, setBtnMsg] = useState("Proceed")
  const [churchBranch, setChurchBranch] = useState()

  const handleEditDynamic = async () => {
    editableText == "Edit Profile"
      ? setEditableText("Cancel Edit")
      : setEditableText("Edit Profile");
    editable ? setEditable(false) : setEditable(true);
  };
  const check = userDetails.userDepartment.filter(data => data.deptName === requestingDept)
  const handleSaving = async () => {
    const isUserBranch = await userDetails?.churchBranch.filter(branch => branch === churchBranch);
    if(isUserBranch.length === 0){
      Alert.alert(`Not sent`, `This is not your branch!`, [
        { text: "OK", onPress: () => console.log("not sent due to user error") },
      ]);
      return;
    }
    if(check.length >= 1){
      Alert.alert(`Not sent`, `You already belong to this group....`, [
        { text: "OK", onPress: () => console.log("not sent due to user error") },
      ]);
    } else{
      // proceed with updating
      !showPasswordInput
      ? setShowPasswordInput(true)
      : setShowPasswordInput(false);
    if (showPasswordInput && password) {
      setEditableText("Processing");
      const res = await fetch("http://192.168.43.49:8080/updateuser", {
        body: JSON.stringify({
          id: userDetails.id,
          firstName: firstName,
          lastName: lastName,
          emailAddress: email,
          phoneNumber: phoneNumber,
          churchBranch,
          password: password,
          requestingDept: requestingDept == '' ? null : requestingDept
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });

      const data = await res.json();
      if (data.success === true) {
        let user_data = data.data;
        await AsyncStorage.setItem("userProfile", JSON.stringify(user_data));
        dispatch(setUserDetails(user_data));
        // console.log(user_data)
        setEditableText("Cancel Edit");
        setEditable(false);
        setShowPasswordInput(false);
        Alert.alert(`Done!`, `${data.message}`, [
          { text: "OK", onPress: () => console.log("done") },
        ])
        return;
      }
      setEditableText("Cancel Edit");
      Alert.alert(`Done!`, `${data.message}`, [
        { text: "OK", onPress: () => console.log("done") },
      ]);
      return;
    }
    }
  };

  const currentDepartments = userDetails.userDepartment ? userDetails.userDepartment.map((dept, index) => {
    return (
      <View key={index} style={styles.depts}>
        <Text style={styles.deptText}>Dept name: {dept.deptName === "media_department" ? 'Media Department' : dept.deptName === "choir_department" ? 'Choir Departmnt' : dept.deptName === "ministers_department" ? 'Ministers Department' : dept.deptName === "ushering_department" ? 'Ushering Department' : dept.deptName === "worker" ? 'Workers' : null}</Text>
        <Text style={styles.deptText}>Exco? {dept.exco === true ? 'true' : 'false'}</Text>
        <Text style={styles.deptText}>Position: {dept.position}</Text>
      </View>
    );
  }): null;

  return (
    <View style={styles.body}>
      <View style={styles.intro}>
        <Text style={styles.introLeft}>Profile</Text>

        <View style={styles.introRight}>
          <Text>
            {userDetails.accountStatus == "not_active" ? "Inactive" : "Active"}
          </Text>
        </View>
      </View>

      <View style={styles.paperArea}>
        <TouchableOpacity onPress={handleEditDynamic} style={styles.touching}>
          <View style={styles.blinkEdit}>
            <Text style={styles.editTip}>{editableText}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.dp}>
          <Image
            style={styles.stretch}
            source={require("../../assets/dp.png")}
          />
        </View> */}

        <ScrollView>
          <View style={styles.formArea}>
            <View style={styles.individualBox}>
              <Text style={styles.individualText}>Firstname:</Text>

              <TextInput
                onChangeText={(e) => setFirstName(e)}
                style={styles.input}
                placeholder={userDetails.firstName}
                editable={editable}
              />
            </View>

            <View style={styles.individualBox}>
              <Text style={styles.individualText}>Lastname:</Text>

              <TextInput
                onChangeText={(e) => setLastName(e)}
                style={styles.input}
                placeholder={userDetails.lastName}
                editable={editable}
              />
            </View>

            <View style={styles.individualBox}>
              <Text style={styles.individualText}>Email:</Text>

              <TextInput
                onChangeText={(e) => setEmail(e)}
                style={styles.input}
                placeholder={userDetails.emailAddress}
                editable={editable}
              />
            </View>

            <View style={styles.individualBox}>
              <Text style={styles.individualText}>Role:</Text>

              <TextInput
                onChangeText={(e) => setUserRole(e)}
                style={styles.input}
                placeholder={userDetails.userRole}
                editable={editable}
              />
            </View>

            <View style={styles.individualBox}>
              <Text style={styles.individualText}>Mobile:</Text>

              <TextInput
                onChangeText={(e) => setPhoneNumber(e)}
                style={styles.input}
                placeholder={userDetails.phoneNumber.toString()}
                editable={editable}
              />
            </View>

            {
                !editable ? <View style={styles.myDept}>
                <Text style={styles.myDeptText}>My Departments</Text>
                {currentDepartments}
              </View> : null
            }

            {showPasswordInput ? (
              <View style={styles.individualBox}>
                <TextInput
                  secureTextEntry
                  onChangeText={(e) => setPassword(e)}
                  style={styles.input}
                  placeholder="Password to confirm it is really you"
                  editable={editable}
                />
              </View>
            ) : null}

            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={requestingDept}
                onValueChange={(itemValue, itemIndex) =>
                  setRequestingDept(itemValue)
                }
              >
                <Picker.Item label="Request to join a department" value="" />
                <Picker.Item
                  label="Ministers Department"
                  value="ministers_department"
                />
                <Picker.Item
                  label="Ushering Department"
                  value="ushering_department"
                />
                <Picker.Item
                  label="Choir Department"
                  value="choir_department"
                />
                <Picker.Item
                  label="Media Department"
                  value="media_department"
                />
                 <Picker.Item
                  label="Workers"
                  value="worker"
                />
              </Picker>
            </View>

            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={churchBranch}
                onValueChange={(itemValue, itemIndex) =>
                  setChurchBranch(itemValue)
                }
              >
                <Picker.Item label="Which Church Branch?" value="" />
                <Picker.Item
                  label="Lagos Branch"
                  value="lagos_branch"
                />
                <Picker.Item
                  label="HeadQuater Benin"
                  value="benin_headquater"
                />
              </Picker>
            </View>

            {editable ? (
              <TouchableOpacity onPress={handleSaving}>
                <View style={styles.customBtn}>
                  <Text style={styles.customText}>{btnMsg}</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#3464eb",
    paddingTop:30
  },

  intro: {
    height: 50,
    width: "100%",
    backgroundColor: "transparent",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  introLeft: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  introRight: {
    fontSize: 17,
  },
  paperArea: {
    backgroundColor: "whitesmoke",
    minHeight: "80%",
    width: "90%",
    marginTop: 50,
    marginLeft: "5%",
  },
  dp: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "whitesmoke",
    position: "absolute",
    top: "-10%",
    left: "35%",
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    zIndex: 1,
  },
  stretch: {
    width: "100%",
    height: "100%",
  },
  editTip: {
    fontSize: 16,
    color: "white",
    fontWeight: "700",
  },
  touching: {
    position: "absolute",
    top: "0%",
    right: "2%",
    zIndex: 2,
    width: "25%",
    minHeight: 30,
    margin: "2%",
    backgroundColor: "#4374c4",
    padding: "1%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  blinkEdit: {},
  formArea: {
    marginTop: 45,
    width: "90%",
    marginLeft: "5%",
  },
  individualBox: {
    height: 40,
    width: "100%",
    // backgroundColor: 'red',
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    borderColor: "#cfd0d1",
    paddingLeft: 5,
    borderWidth: 1,
  },
  individualText: {
    fontSize: 17,
    fontWeight: "500",
  },
  input: {
    height: 40,
    width: "100%",
    marginLeft: 10,
  },
  customBtn: {
    height: 40,
    width: "40%",
    backgroundColor: "blue",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
    marginLeft: "30%",
  },
  customText: {
    color: "white",
    fontWeight: "bold",
  },
  roleBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: 40,
    justifyContent: "center",
    marginTop: 10,
  },
  role: {
    textAlign: "center",
    fontSize: 15,
    color: "black",
  },
  depts: {
      backgroundColor: 'white',
      borderWidth: 1, 
      borderRadius:10,
      marginTop: 10,
      padding: 5
  },
  deptText: {},
  myDept: {
    minHeight: "20%",
    width: "100%",
    marginTop: 10,
  },
  myDeptText: {
    fontSize: 13,
  },
});

export default Profile_Settings;
