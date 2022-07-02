import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  FlatList
} from "react-native";
import betaVersion from "../../Hooks/betaVersion.js";
import * as Speech from "expo-speech";
// import { firebase } from "../../config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase.js";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as MediaLibrary from "expo-media-library";
import { ScrollView } from "react-native";

const AddPodcastSermon = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [videoRef, setVideoRef] = useState('')
  const [name, setName] = useState("");
  const [btnMsg, setBtnMsg] = useState("Add Number");
  const [audioFiles, setAudioFiles] = useState([]);
  const [musicUploadMsg, setMusicUploadMsg] = useState('')
  const [videoProgress, setVideoProgress] = useState(0);

  const handleSubmit = async () => {
    if (!name || !phoneNumber) {
      Alert.alert(`ERROR!!!`, `Please, Provide details`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    setBtnMsg("Adding....");
    try {
      const res = await fetch(`http://192.168.43.224:8000/ai/addProfile`, {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data?.success == false) {
        Alert.alert(`ERROR!!!`, `${data?.message}`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        setBtnMsg("Add Number");
        return;
      }
      setBtnMsg("Success!");
      console.log(data?.success, "as data coming in");
    } catch (error) {
      console.log(error, "As error");
      setBtnMsg("Add Number");
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    console.log(permission);
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        // display some allert or request again to read media files.
        getPermission();
      }

      if (status === "granted") {
        // we want to get all the audio files
        getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        // we want to display some error to the user
      }
    }
    if (permission.granted) {
      // we want to get all the audio files
      getAudioFiles();
    }
    if (!permission.canAskAgain && !permission.granted) {
      console.log("user denied and we can't ask again");
    }
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    
    media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: media.totalCount,
    });
    
    // console.log(media);
    setAudioFiles(media.assets)
 };

//  useEffect(() => {
//    console.log(audioFiles, "audioFiles")
//  }, [audioFiles])

const willUpload = (audio) => {
    Alert.alert(`Note`, `Do you want to upload this audio?`, [
        { text: "No", onPress: () => console.log('') },
        { text: "Yes", onPress: () => handePress(audio) },
      ]);
}

const handePress = async(audio) => {
    const rawAudio = await fetch(audio?.uri)
    const bytes = await rawAudio.blob();
    const uid = uuidv4();
    const storageRef = ref(storage, `/files/${bytes.name}&ref=${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, bytes);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setVideoProgress(prog);
        prog === 100 && setMusicUploadMsg('Getting things ready. Please wait.')
      },
      (err) => {
        Alert.alert(`ERROR!!!`, `Error while uploading audio`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        console.log(err);
        return
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => uploadUrlFromFirebaseToDb(url));
      }
    );
}

const uploadUrlFromFirebaseToDb = async(url) => {
    const res = await fetch(`http://192.168.43.224:8000/ai/getProfiles`, {
        body: JSON.stringify({
            title:'',
            podcastUrl:'',
            event:'',
            podcastType:'',
            poster:'',
            branch:'',
            fileName:'',
            preacher:'',
            service:''
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
    });
    const data = res.json();
    if(data?.sucess == false){
        Alert.alert(`ERROR!!!`, `Something went wrong. Sorry.`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          return;
    }
    setMusicUploadMsg('Upload Completed!')
    return

}

const displayAudios = audioFiles.map((audio, index) => {
   return <TouchableOpacity onPress={() => willUpload(audio)} key={index} style={styles.audioTitle}><Text>{audio.filename}</Text></TouchableOpacity>
})
 
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>Add Audio Below</Text>
      <ScrollView contentContainerStyle={styles.body}>

      {/* <FlatList
      data={audioFiles}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.audioTitle}><Text>{item.filename}</Text></TouchableOpacity>
      )}
    /> */}
    {displayAudios}
    </ScrollView>

    </View>
  );
};

export default AddPodcastSermon;

const styles = StyleSheet.create({
  body: {
    padding: 20,
    // justifyContent: "flex-start",
    // alignItems: "center",
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
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 50,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 50,
    justifyContent: "center",
    marginTop: 50,
    alignItems: "center",
  },
  btnText: {
    fontSize: 17,
    color: "black",
  },
  audioTitle:{
    height:30,
    marginTop:10,
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    padding:'1%',
    alignItems:'center',
    width:'100%',
    borderStyle:'solid',
    borderColor:'white',
    backgroundColor:'whitesmoke',
    borderRadius:2
  },
});
