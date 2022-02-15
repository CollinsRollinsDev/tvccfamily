import React, { Component, memo } from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { Picker } from "@react-native-picker/picker";

// TODO; Update screen for major bug when ready!!!

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
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import DatePicking from "./DatePicking";

const AddEvent = ({ navigation }) => {
  let [date, setNewDate] = useState(new Date());
  const [dateChoosen, setDate] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState();
  const [timeText, setTimeText] = useState();
  const { currentTitle, currentPostBody, currentMinistering, userDetails } =
    useSelector((state) => state.useTheReducer);

  const [name, setName] = useState();
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
  let [hour, setHour] = useState("00");
  const [formattedHour, setFormattedHour] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  let [format, setFormat] = useState("AM");
  let [churchBranch, setChurchBranch] = useState("lagos_branch");
  const [description, setDescription] = useState();
  const [backupSelectedDate, setBackupSelectedDate] = useState();

  const onChange = (event, selectedDate) => {
    selectedDate && setBackupSelectedDate(selectedDate);
    const currentDate = selectedDate || backupSelectedDate || date;
    setShow(Platform.OS === "ios");
    setNewDate(currentDate);
    let tempDate = new Date(currentDate);
    console.log(tempDate, "as temp date");
    // get month,
    const newMonth = moment(tempDate.getMonth() + 1, "M").format("MMMM");
    setMonth(newMonth);
    //get day(date)
    const newDay = tempDate.getDate();
    setDay(newDay);
    // get Year
    const newYear = tempDate.getFullYear();
    setYear(newYear);
    // get minutes
    let newMinutes = tempDate.getMinutes();
    setMinutes(newMinutes);
    // get hours
    let newHour = tempDate.getHours();
    setHour(newHour);

    let Fdate = `${moment(tempDate.getMonth() + 1, "M").format(
      "MMMM"
    )} ${tempDate.getDate()}, ${tempDate.getFullYear()}`;
    let fTime =
      "Hours:" + tempDate.getHours() + "| minutes: " + tempDate.getMinutes();
    let FTime = `Hour:${tempDate.getHours()}  /  Minutes:${tempDate.getMinutes()}`;
    setDateText(Fdate);
    setTimeText(FTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    setDate(`${month} ${day} ${year}`);
  }, [month, day, year]);

  const handleSave = async () => {
    if (allowViewsBy == "all" || allowViewsBy == "worker") {
      if (
        userDetails.accountType === "admin" &&
        userDetails.churchBranch.includes(churchBranch)
      ) {
        const res = await fetch("https://tvccserver.vercel.app/event", {
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
            [{ text: "OK", onPress: () => navigation.replace("Event") }]
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
      setDate(`${month} ${day} ${year}`);
      let allowCreate = false;
      // const result = await userDetails?.userDepartment.find(item => {
      //   if(item.deptName === allowViewsBy && item.exco === true && churchBranch === item.churchBranch){
      //     // allowCreate = true;
      //   }
      // })
      const auth = await userDetails.userDepartment.filter((user) => {
        return user.deptName === allowViewsBy;
      });
      console.log("waiting for", auth);
      if (auth.length != 0) {
        const result = await userDetails?.userDepartment.find(async (item) => {
          console.log(item.deptName === allowViewsBy);
          console.log(item.exco === true);
          console.log(churchBranch === item.churchBranch);
          console.log(churchBranch);
          console.log(item.churchBranch);
          if (
            item.deptName === allowViewsBy &&
            item.exco === true &&
            churchBranch === item.churchBranch
          ) {
            // allowCreate = true;
            console.log("allowed to create");

            const res = await fetch("https://tvccserver.vercel.app/event", {
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
                `Event with name "${name}" to host on ${month} ${day} ${year} at ${hour}:${minutes} has been created successfully.`,
                [{ text: "OK", onPress: () => navigation.replace("Event") }]
              );
            } else {
              console.log("else");
              Alert.alert(`UNSUCCESSFUL!!!`, `Something went wrong`, [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            }
          } else {
            console.log("not allowed to create");
            // You can not create event here as you are not an exco
            Alert.alert(
              `UNAUTHORIZED!!!`,
              `You can only create an event in this group if you are part of the exco`,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
          }
        });
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
      {/* <Header name="Add an Event" leftSide="Search" /> */}
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
                  setChurchBranch((prevState) => (prevState = itemValue));
                  // handleSwitch(itemValue)
                }}
              >
                <Picker.Item label="Lagos Branch" value="lagos_branch" />
                <Picker.Item
                  label="Benin HeadQuater"
                  value="benin_headquater"
                />
              </Picker>
            </View>

            {/* <Text style={styles.columnFeel} >:</Text> */}
            <TouchableOpacity
              onPress={() => showMode("date")}
              style={styles.dateBtn}
            >
              <Text style={styles.dateContent}>
                {dateText ? dateText : "Choose Date"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showMode("time")}
              style={styles.dateBtn}
            >
              <Text style={styles.dateContent}>
                {timeText ? timeText : "Choose Time"}
              </Text>
            </TouchableOpacity>

            {show && (
              // <DateTimePicker
              //   testID="dateTimePicker"
              //   value={date}
              //   mode={mode}
              //   is24Hour={true}
              //   display="default"
              //   onChange={onChange}
              // />
              <DatePicking
                testID="dateTimePicker"
                date={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            {/* <Text style={styles.columnFeel} >:</Text> */}
          </View>
          {/* Date area */}

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

export default memo(AddEvent);

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
  dateContent: {
    color: "black",
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
  dateBtn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
  },
});
