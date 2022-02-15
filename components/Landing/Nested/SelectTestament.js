import React from "react";
import { Picker } from "@react-native-picker/picker";

import { StyleSheet, View } from "react-native";

const SelectTestament = ({ setTestamentPicked, selectedBook }) => {
  return (
    <View style={styles.bookArea}>
      <Picker
        style={styles.oldBook}
        selectedValue={selectedBook}
        onValueChange={(itemValue, itemIndex) => setTestamentPicked(itemValue)}
      >
        <Picker.Item label="Select Testament" value="" />
        <Picker.Item label="Old Testament" value="oldTestament" />
        <Picker.Item label="New Testament" value="newTestament" />
      </Picker>
    </View>
  );
};

export default SelectTestament;

const styles = StyleSheet.create({
  bookArea: {
    width: "50%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: "25%",
    marginTop: 20,
    marginBottom: 30,
  },
  oldBook: {
    height: "100%",
    width: "100%",
    //   color: 'white',
  },
});
