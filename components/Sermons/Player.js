import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from "react-redux";

const Player = ({ navigation }) => {
    const { musicSound } = useSelector((state) => state.useTheReducer)
  const [seekValue, setSeekValue] = useState(0);
  const [sound, setSound] = React.useState();

  useEffect(() => {
    musicSound && playAudio(musicSound);
  }, [musicSound])
  

  const playAudio = async(audio) => {
    setTimeout(async() => {
        const { sound } = await Audio.Sound.createAsync({
            uri: audio.podcastUrl
          });
          console.log(sound.isPlaying, "as sound to consolr.loh log on")
          setSound(sound);
          await sound.playAsync();
    }, 1000);
}

React.useEffect(() => {
    // return sound
    //   ? () => {
    //       console.log('Unloading Sound');
    //       sound.unloadAsync(); }
    //   : undefined;
  }, [sound]);




  const albumBox = <View style={styles.albumContainer}>


  </View>;

const seeker = (
    <View style={styles.seekerContainer}>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );

//   console.log(musicSound, "musicSound")
  
      const buttomContainer = (
          <View style={styles.buttomContainer}>
              <TouchableOpacity style={{height:30, width:30, backgroundColor:'blue'}}>
                  <Text>Play</Text>
              </TouchableOpacity>
              {seeker}
          </View>
      )

  return (
    <View style={styles.body}>
      {albumBox}

      {buttomContainer}
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#212121",
    minHeight: "100%",
    marginBottom: 50,
    paddingTop: 40,
    width:'100%',
    position:'relative',
  },
  seekerContainer: {
    height: 30,
    width: "100%",
  },
  albumContainer: {
    height:300,
    width:'80%',
    backgroundColor:'#b5b3b3',
    borderRadius:3,
    marginLeft:'10%',
    marginTop:20,


  },
  buttomContainer:{
    position:'absolute',
    bottom:0,
    height:100,
    padding:'5%',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',
  },
});
