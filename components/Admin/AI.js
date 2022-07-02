import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import betaVersion from "../../Hooks/betaVersion.js";
import * as Speech from "expo-speech";

const AI = ({ navigation }) => {
  const welcomeSpeech = () => {
    const thingToSay =
      "Welcome to Truevine Artificial Intellegence. I am Raina. Do you want me to be your A.I companion?";
    Speech.speak(thingToSay, {
      rate: 0.8,
      pitch: 0.7,
      onDone: () => {
        Alert.alert(`A.I ALLOW`, `Should I be your companion?`, [
          { text: "No", onPress: () => handleNo },
          { text: "Yes", onPress: () => handleYes },
        ]);
      },
    });
  };

  const handleNo = () => {
    Speech.speak('Thanks and have a good day!', {
        rate: 0.8,
        pitch: 0.7,
      });
  }

  const handleYes = () => {
    Speech.speak('Great! Lets ride on.', {
        rate: 0.8,
        pitch: 0.7,
      });
  }

  useLayoutEffect(() => {
    const unsub = welcomeSpeech();
    return () => {
      Speech.stop(), unsub;
    };
  }, []);

  // for beta state
  const [items, setItems] = React.useState([
    {
      name: "Add phone number to automate text message for.",
      path: "AddNumberForTextMsg",
    },
    {name: "View Profiles/Phone Numbers Added", path: "ViewProfiles"},
  ]);
  
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Welcome to Aritificial Intelligience. What can we do for you.
      </Text>

      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              item.path !== "" ? navigation.push(item.path) : betaVersion()
            }
            style={styles.itemContainer}
          >
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AI;

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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: "white",
  },
  itemName: {
    textAlign: "center",
    fontWeight: "600",
  },
});
