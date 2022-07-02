import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import * as Speech from "expo-speech";
import { Audio } from 'expo-av';


const GetPodcasts = ({ navigation }) => {
  const [message, setMessage] = useState("Getting Profiles....");
  const [podcasts, setPodcasts] = useState([]);
  const [sound, setSound] = React.useState();

  const playAudio = async(audio) => {
    const { sound } = await Audio.Sound.createAsync({
        uri: audio.podcastUrl
      });
      console.log(sound, "as sound")
      setSound(sound);
      await sound.playAsync();
}

React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const getAudios = async () => {
    try {
      const res = await fetch(`http://192.168.43.224:8000/audio/getAudio`);
      const data = await res.json();
      if (data?.success === false) {
        Alert.alert(`ERROR!!!`, `${data?.message}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }
      setPodcasts(data?.data);
    } catch (error) {
      console.log(error, "As err");
      Alert.alert(`ERROR!!!`, `Something went wrong.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
  };

  useLayoutEffect(() => {
    getAudios();
  }, []);

  useEffect(() => {
    console.log(podcasts, "podcasts");
  }, [podcasts]);

  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>All Podcasts</Text>
      {
        //     podcasts.length > 0 && <FlatGrid
        //     itemDimension={130}
        //     data={podcasts}
        //     style={styles.gridView}
        //     // staticDimension={300}
        //     // fixed
        //     spacing={10}
        //     renderItem={( {item} ) => {
        //         console.log(item, "As profile")
        //       return <TouchableOpacity
        //         // onPress={() => item.path !== "" ? navigation.push(item.path) : betaVersion()}
        //         style={styles.itemContainer}
        //       >
        //         <Text style={styles.itemName}>Preacher: {item?.preacher.toUpperCase().replace(/_/g, ' ')}</Text>
        //         <Text style={styles.itemName}>Title: {item?.title}</Text>
        //         <Text style={styles.itemName}>Event: {item?.event}</Text>
        //         <Text style={styles.itemName}>PodcastType: {item?.podcastType}</Text>
        //       </TouchableOpacity>
        //     }}
        //   />
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => playAudio(item)} style={styles.audioTab}>
              <Text style={styles.itemName}>
                Preacher.............. {item?.preacher.toUpperCase().replace(/_/g, " ")}
              </Text>
              <Text style={styles.itemName}>Title..................... {item?.title}</Text>
              <Text style={styles.itemName}>Event..................... {item?.event}</Text>
              <Text style={styles.itemName}>
                PodcastType........ {item?.podcastType}
              </Text>
            </TouchableOpacity>
          )}
        />
      }
    </View>
  );
};

export default GetPodcasts;

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
  audioTab: {
    height: 100,
    marginTop: 10,
    flex: 1,
    padding:'1%',
    justifyContent: "flex-start",
    padding: "1%",
    alignItems: "flex-start",
    width: "100%",
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "whitesmoke",
    borderRadius: 2,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 180,
    backgroundColor: "white",
  },
  itemName: {
    fontWeight: "600",
    fontSize: 11,
  },
});
