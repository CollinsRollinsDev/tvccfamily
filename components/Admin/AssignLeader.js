import React from "react";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const AssignLeader = ({ navigation }) => {
  const { userDetails } = useSelector((state) => state.useTheReducer);
  // const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [currentPerson, setCurrentPerson] = useState();
  const [churchBranch, setChurchBranch] = useState();
  const [hightlightUser, setHighlightUser] = useState(false);
  const [displayCurrentPerson, setDisplayCurrentPerson] = useState(false);
  const [userDepartment, setuserDepartment] = useState();
  const [roleGiven, setRoleGiven] = useState("leader");
  const [btnMsg, setBtnMsg] = useState("Assign as leader");
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSubmit = async (e) => {
    setDisplayCurrentPerson(false);
    // console.log(e);
    let match = e.match(/^[a-zA-Z ]*/);
    let match2 = e.match(/\s*/);
    if (match2[0] === e) {
      return;
    }

    const options = {
      url: "http://192.168.43.224:8000/searchUsers",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        fullName: e,
      },
    };
    // if (match[0] === e) {
    setHighlightUser(false);
    const data = await axios(options);
    setSearchResult(data.data.result);
    // console.log(data.data.result)
    // }
  };

  const mapped = searchResult.map((item, index) => {
    if (item.emailAddress === userDetails.emailAddress) {
      return;
    }
    if (searchResult.length === 0) {
      return (
        <TouchableOpacity
          style={styles.nameSuggestBox}
          key={index}
          // className={styles.searchReturn}
        >
          <Text style={styles.suggestText}>"No User Found"</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.nameSuggestBox}
        onPress={() => [setCurrentPerson(item), setDisplayCurrentPerson(true)]}
        key={index}
        // className={styles.searchReturn}
      >
        <Text style={styles.suggestText}>{item.fullName}</Text>
        <Text style={styles.suggestText}>{item.emailAddress}</Text>
        <Text style={styles.suggestText}>{item.phoneNumber}</Text>
      </TouchableOpacity>
    );
  });

  const handleAssign = async () => {
    setDisableBtn(true);
    if (!userDepartment || !churchBranch || !currentPerson) {
      Alert.alert(`ERROR!!!`, `Seems you left something out`, [{ text: "OK" }]);
      setDisableBtn(false);
      return;
    }

    let minifyDepartment;
    if (userDepartment == "ministers_department") {
      minifyDepartment = "Ministers Department";
    } else if (userDepartment == "ushering_department") {
      minifyDepartment = "Ushering Department";
    } else if (userDepartment == "media_department") {
      minifyDepartment = "Media Department";
    } else if (userDepartment == "choir_department") {
      minifyDepartment = "Choir Department";
    } else if (userDepartment == "worker") {
      minifyDepartment = "Worker Department";
    } else {
      setDisableBtn(false);
      return;
    }
    //confirm admin decison first
    Alert.alert(
      `Confirmation,`,
      `You are about to assign ${currentPerson.firstName} ${currentPerson.lastName} as a leader to ${minifyDepartment}.`,
      [
        {
          text: "Abort!",
          onPress: () => {
            navigation.replace("Admin");
            setDisableBtn(false);
            return null;
          },
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: async () => {
            try {
              let proceed = false;

              if (userDetails?.churchBranch.includes(churchBranch)) {
                proceed = true;
              } else {
                Alert.alert(
                  `ERROR!!!`,
                  `Not Allowed to assign leader to this branch`,
                  [{ text: "OK" }]
                );
                setDisableBtn(false);
                proceed = false;
                return;
              }
              console.log("assning...");
              setBtnMsg("Assigning Person...");
              console.log(userDetails);
              const res = await fetch(
                `http://192.168.43.224:8000/assignGroupLeader?id=${currentPerson._id}&assignerId=${userDetails?.id}&churchBranch=${churchBranch}&deptName=${userDepartment}`,
                {
                  method: "PATCH",
                }
              );

              const data = await res.json();
              if (data.success !== true) {
                Alert.alert(`ERROR!!!`, `${data.message}`, [
                  {
                    text: "OK",
                    onPress: () => {
                      // do nothing
                    },
                  },
                ]);
                setDisableBtn(false);
                setBtnMsg("Assign as leader");
                return;
              }
              Alert.alert(`Completed!`, `Your request is processed!`, [
                {
                  text: "OK",
                  onPress: () => {
                    // do nothing
                  },
                  style: "cancel",
                },
              ]);
              setDisableBtn(false);
              setBtnMsg("Request is completed!");
              return;
            } catch (error) {
              setDisableBtn(false);
              setBtnMsg("Assign as leader");
            }
          },
        },
      ]
    );
  };

  const formForAssignmnt = (
    <View style={styles.formBody}>
      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={churchBranch}
          onValueChange={(itemValue, itemIndex) => setChurchBranch(itemValue)}
        >
          <Picker.Item
            label={`${currentPerson && currentPerson.firstName} is at branch?`}
            value=""
          />
          <Picker.Item label="Lagos Branch" value="lagos_branch" />
          <Picker.Item label="Benin HeadQuater" value="benin_headquater" />
        </Picker>
      </View>

      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={userDepartment}
          onValueChange={(itemValue, itemIndex) => setuserDepartment(itemValue)}
        >
          <Picker.Item label="Choose Department" value="" />
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
          <Picker.Item label="Worker" value="worker" />
        </Picker>
      </View>

      <TouchableOpacity
        disabled={disableBtn}
        onPress={handleAssign}
        style={styles.btn}
      >
        <Text style={styles.btnText}>{btnMsg}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Start typing name of person you wish to assign as a leader to a group
      </Text>
      <TextInput
        onChangeText={(e) => handleSubmit(e)}
        style={styles.nameInput}
        underlineColorAndroid="transparent"
        placeholder="Name of individual here..."
      />
      {!displayCurrentPerson && mapped}
      {displayCurrentPerson && currentPerson && (
        <View style={styles.selectedUser}>
          <Text style={styles.selectInfo}>You selected the user with:</Text>
          <Text style={styles.selectProp}>
            Name:{" "}
            <Text
              style={styles.selectValue}
            >{`${currentPerson.firstName} ${currentPerson.lastName}`}</Text>{" "}
          </Text>
          <Text style={styles.selectProp}>
            Email:{" "}
            <Text
              style={styles.selectValue}
            >{`${currentPerson.emailAddress}`}</Text>{" "}
          </Text>
          <Text style={styles.selectProp}>
            Phone Number:{" "}
            <Text
              style={styles.selectValue}
            >{`${currentPerson.phoneNumber}`}</Text>{" "}
          </Text>
        </View>
      )}

      {displayCurrentPerson && formForAssignmnt}
    </View>
  );
};

export default AssignLeader;

const styles = StyleSheet.create({
  body: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3464eb",
    minHeight: "100%",
    marginBottom: 50,
    paddingTop: 50,
  },
  nameSuggestBox: {
    minHeight: 70,
    width: "80%",
    borderColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestText: {
    color: "whitesmoke",
  },
  selectedUser: {
    color: "whitesmoke",
    marginTop: 20,
    fontSize: 17,
    width: "80%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  selectInfo: {
    color: "whitesmoke",
    fontSize: 16,
    textAlign: "left",
  },
  selectProp: {
    color: "whitesmoke",
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
  },
  selectValue: {
    color: "yellow",
    fontSize: 16,
    marginTop: 10,
    // textAlign:'center',
  },
  heading1: {
    fontSize: 17,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  nameInput: {
    backgroundColor: "white",
    width: "80%",
    height: 40,
    marginTop: 40,
    paddingLeft: 10,
    borderRadius: 10,
  },
  formBody: {
    height: "auto",
    width: "100%",
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
});
