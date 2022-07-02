import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import betaVersion from '../../../Hooks/betaVersion.js';
import * as Speech from 'expo-speech';

const ViewProfiles = ({ navigation }) => {
    const [message, setMessage] = useState('Getting Profiles....');
    const [profiles, setProfiles] = useState([])
 
  // for beta state
//   const [items, setItems] = React.useState([
//     { name: "Collins Rollins", phoneNumber:'0908080'},
//     { name: "Kelvin Smith", phoneNumber:'09087878' },
//   ]);

  const getProfiles = async() => {
    try {
        const res = await fetch(`http://192.168.43.224:8000/ai/getProfiles`);
        const data = await res.json();
        if(data?.success === false){
            Alert.alert(`ERROR!!!`, `${data?.message}`, [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
            return
        }
        setProfiles(data?.data)
    } catch (error) {
        console.log(error, "As err")
        Alert.alert(`ERROR!!!`, `Something went wrong.`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        return
    }
  }

  useLayoutEffect(() => {
    getProfiles();
  }, [])

  useEffect(() => {
    console.log(profiles, "profiles")
  }, [profiles])

  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Lists of Profiles Added
      </Text>{
        profiles.length > 0 && <FlatGrid
        itemDimension={130}
        data={profiles}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        spacing={10}
        renderItem={( {item} ) => {
            console.log(item, "As profile")
          return <TouchableOpacity
            // onPress={() => item.path !== "" ? navigation.push(item.path) : betaVersion()}
            style={styles.itemContainer}
          >
            <Text style={styles.itemName}>{item?.name}</Text>
            <Text style={styles.itemName}>{item?.phoneNumber}</Text>
          </TouchableOpacity>
        }}
      />
      }
      
    </View>
  );
};

export default ViewProfiles;

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
    height: 80,
    backgroundColor: "white",
  },
  itemName: {
    textAlign: "center",
    fontWeight: "600",
  },
});
