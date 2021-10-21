import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Picker } from "@react-native-picker/picker";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  LogBox,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const AddEvent = ({ navigation }) => {
  const { currentTitle, currentPostBody, currentMinistering, userDetails } =
    useSelector((state) => state.useTheReducer);

  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [host, setHost] = useState();
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState("2021");
  const [allowViewsBy, setAllowViewsBy] = useState("all");
  const [poster, setPoster] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    id: userDetails.id,
  });
  const [leaderAccess, setLeaderAccess] = useState();

  useEffect(() => {
    setLeaderAccess(
      allowViewsBy === "ministers_department"
        ? "ministers_leader"
        : allowViewsBy === "choir_department"
        ? "choir_leader"
        : allowViewsBy === "ushering_department"
        ? "usher_leader"
        : allowViewsBy === "media_department"
        ? "media_leader"
        : null
    );
  }, [allowViewsBy]);

  // console.log(leaderAccess)

  let [hour, setHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  let [format, setFormat] = useState("AM");
  let [churchBranch, setChurchBranch] = useState("AM");
  const [description, setDescription] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleChapterPress = async (event) => {};

  const formatter1 = async () => {
    if (hour == "00") {
      setHour((hour = "00"));
    } else if (hour == "12" && format == "AM") {
      setHour((hour = "00"));
    }
  };

  useEffect(() => {
    formatter1();
  }, [hour]);

  useEffect(() => {
    if (format == "PM" && hour != "12") {
      setHour((hour = parseInt(hour) + 12));
    } else if (format == "AM" && parseInt(hour) > 12) {
      setHour((hour = parseInt(hour) - 12).toString());
      if (hour != "10" || hour != "11") {
        setHour(`0${hour}`);
      }
    } else {
      hour;
    }
  }, [format]);

  useEffect(() => {
    setDate(`${month} ${day}, ${year}`);
  }, [month, day, year]);

  const handleSave = async () => {
    if (allowViewsBy == "all" || allowViewsBy == "worker") {
      if (userDetails.accountType === "admin" && userDetails.churchBranch.includes(churchBranch)) {
        const res = await fetch("http://192.168.43.37:8080/event", {
          body: JSON.stringify({
            name: name,
            host: host,
            description: description,
            date: date,
            hour: hour,
            minutes: minutes,
            seconds: seconds,
            poster: poster,
            churchBranch: churchBranch,
            allowViewsBy: allowViewsBy,
            leaderAccess: leaderAccess,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        console.log("two");

        const result = await res.json();
        if (result.success == true) {
          Alert.alert(
            `Event Created!`,
            `Event with name "${name}" to host on ${date} at ${hour}:${minutes} has been created successfully.`,
            [{ text: "OK", onPress: () => navigation.push("Event") }]
          );
        } else {
          Alert.alert(`UNSUCCESSFUL!!!`, `Something went wrong`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      } else {
        Alert.alert(
          `UNSUCCESSFUL!!!`,
          `Only admin can create this type of event for now!`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    } else {
      setDate(`${month} ${day}, ${year}`);
      const auth = await userDetails.userDepartment.filter((user) => {
        return user.deptName === allowViewsBy;
      });
      console.log("waiting for", auth);
      if (auth.length != 0) {
        if (auth[0].exco === true && userDetails.churchBranch.includes(churchBranch)) {
          const res = await fetch("http://192.168.43.37:8080/event", {
            body: JSON.stringify({
              name: name,
              host: host,
              description: description,
              date: date,
              hour: hour,
              minutes: minutes,
              seconds: seconds,
              churchBranch: churchBranch,
              poster: poster,
              allowViewsBy: allowViewsBy,
              leaderAccess: leaderAccess,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });

          console.log("two");

          const result = await res.json();
          if (result.success == true) {
            Alert.alert(
              `Event Created!`,
              `Event with name "${name}" to host on ${date} at ${hour}:${minutes} has been created successfully.`,
              [{ text: "OK", onPress: () => navigation.push("Event") }]
            );
          } else {
            console.log("else");
            Alert.alert(`UNSUCCESSFUL!!!`, `Something went wrong`, [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
          }
        } else {
          // You can not create event here as you are not an exco
          Alert.alert(
            `UNAUTHORIZED!!!`,
            `You can only create an event in this group if you are part of the exco`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        }
      } else {
        // Oops! You dont belong to this group
        Alert.alert(`ERROR!!!`, `Opps! You do not belong to this group`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Header name="Add a Note" leftSide="Search" />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.info}>Fill in details to add event here</Text>

          <TextInput
            onChangeText={(e) => setName(e)}
            style={styles.input}
            placeholder="Name of Event"
          ></TextInput>

          <TextInput
            onChangeText={(e) => setHost(e)}
            style={styles.input}
            placeholder="Host of Event"
          ></TextInput>
          <TextInput
            onChangeText={(e) => setDescription(e)}
            style={styles.input}
            placeholder="Event Description"
          ></TextInput>

          <View style={styles.containerFlex}>
          
            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={churchBranch}
                onValueChange={(itemValue, itemIndex) => {
                  setChurchBranch(itemValue);
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="Lagos Branch" value="lagos_branch" />
                <Picker.Item label="Benin HeadQuater" value="benin_headquater" />
              </Picker>
            </View>


            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={hour}
                onValueChange={(itemValue, itemIndex) =>
                  setHour(
                    format == "PM" && itemValue != "12"
                      ? (itemValue = parseInt(itemValue) + 12)
                      : itemValue
                  )
                }
              >
                <Picker.Item label="Hour" value="" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="01" value="01" />
                <Picker.Item label="02" value="02" />
                <Picker.Item label="03" value="03" />
                <Picker.Item label="04" value="04" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="07" value="07" />
                <Picker.Item label="08" value="08" />
                <Picker.Item label="09" value="09" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
              </Picker>
            </View>
            {/* <Text style={styles.columnFeel} >:</Text> */}
            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={minutes}
                onValueChange={(itemValue, itemIndex) => setMinutes(itemValue)}
              >
                <Picker.Item label="Minutes" value="" />
                <Picker.Item label="00" value="00" />
                <Picker.Item label="05" value="05" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="55" value="55" />
              </Picker>
            </View>

            {/* <Text style={styles.columnFeel} >:</Text> */}

            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={format}
                onValueChange={(itemValue, itemIndex) => {
                  setFormat(itemValue);
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="AM" value="AM" />
                <Picker.Item label="PM" value="PM" />
              </Picker>
            </View>
          </View>

          {/* Date area */}

          <View style={styles.containerFlex}>
            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={month}
                onValueChange={(itemValue, itemIndex) => {
                  setMonth(itemValue);
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="Jan" value="Jan" />
                <Picker.Item label="Feb" value="Feb" />
                <Picker.Item label="March" value="March" />
                <Picker.Item label="April" value="April" />
                <Picker.Item label="May" value="May" />
                <Picker.Item label="June" value="June" />
                <Picker.Item label="July" value="July" />
                <Picker.Item label="Aug" value="Aug" />
                <Picker.Item label="Sept" value="Sept" />
                <Picker.Item label="Oct" value="Oct" />
                <Picker.Item label="Nov" value="Nov" />
                <Picker.Item label="Dec" value="Dec" />
              </Picker>
            </View>

            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={day}
                onValueChange={(itemValue, itemIndex) => {
                  setDay(itemValue);
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="30" value="20" />
                <Picker.Item label="31" value="31" />
              </Picker>
            </View>

            <View style={styles.roleBox}>
              <Picker
                style={styles.role}
                selectedValue={year}
                onValueChange={(itemValue, itemIndex) => {
                  setYear(itemValue);
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="2021" value="2021" />
                <Picker.Item label="2022" value="2022" />
              </Picker>
            </View>
          </View>

          {/* allowViewsBy */}
          <View style={styles.roleBoxOut}>
            <Picker
              style={styles.role}
              selectedValue={allowViewsBy}
              onValueChange={(itemValue, itemIndex) => {
                setAllowViewsBy(itemValue);
                // handleSwitch(itemValue)
              }}
            >
              <Picker.Item label="Choose who will see this event?" value="" />
              <Picker.Item label="All" value="all" />
              <Picker.Item label="Workers" value="worker" />
              <Picker.Item label="All Ministers" value="ministers_department" />
              <Picker.Item label="All Choiristers" value="choir_department" />
              <Picker.Item label="All Ushers" value="ushering_department" />
              <Picker.Item
                label="All Media Team Members"
                value="media_department"
              />
            </Picker>
          </View>
        </View>

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.content}>Save Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#3464eb",
    minHeight: "100%",
  },
  columnFeel: {
    fontSize: 23,
    color: "white",
    marginTop: 30,
    fontWeight: "bold",
  },
  containerFlex: {
    justifyContent: "space-around",
    alignItems: "center",
    // flexDirection: 'row',
    minHeight: 50,
  },
  roleBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    minHeight: 40,
    margin: 10,
    // marginLeft: '10%',
    justifyContent: "center",
    marginTop: 40,
    // alignItems: 'center'
  },
  roleBoxOut: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    minHeight: 40,
    margin: 10,
    marginLeft: "10%",
    justifyContent: "center",
    marginTop: 40,
    // alignItems: 'center'
  },
  role: {
    textAlign: "center",
    fontSize: 17,
    color: "black",
  },
  info: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  container: {
    minHeight: 300,
    width: "100%",
  },
  saveBtn: {
    backgroundColor: "blue",
    height: 40,
    width: "40%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: "30%",
  },
  content: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
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
});
