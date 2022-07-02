import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import betaVersion from "../../Hooks/betaVersion.js";
import * as Speech from "expo-speech";

const PodcastSermons = ({ navigation }) => {
  const [items, setItems] = React.useState([
    {
      name: "Get all avaliable podcast sermons",
      path: "GetPodcasts",
    },
    { name: "Add A Podcast Sermon", path: "AddPodcastSermon" },
    // { name: "Assign Deputy Leader To Group", path: "" },
    // { name: "Send Message To All Members", path: "SendSms" },
  ]);
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Let's listen to the word
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

export default PodcastSermons;

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
