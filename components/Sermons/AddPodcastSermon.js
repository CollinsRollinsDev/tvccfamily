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
  FlatList,
} from "react-native";
import betaVersion from "../../Hooks/betaVersion.js";
import { Picker } from "@react-native-picker/picker";
import * as Speech from "expo-speech";
// import { firebase } from "../../config.js";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase.js";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as MediaLibrary from "expo-media-library";
import { ScrollView } from "react-native";
import { TabRouter } from "react-navigation";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddPodcastSermon = ({ navigation }) => {
    const { userDetails } = useSelector((state) => state.useTheReducer);
  const [phoneNumber, setPhoneNumber] = useState();
  const [videoRef, setVideoRef] = useState("");
  const [name, setName] = useState("");
  const [btnMsg, setBtnMsg] = useState("Add Number");
  const [audioFiles, setAudioFiles] = useState([]);
  const [musicUploadMsg, setMusicUploadMsg] = useState("Add Song");
  const [videoProgress, setVideoProgress] = useState(0);
  const [canFillForm, setCanFilForm] = useState(false);
  const [title, setTitle] = useState("");
  const [podcastUrl, setPodcastUrl] = useState("");
  const [event, setEvent] = useState("");
  const [podcastType, setPodcastType] = useState("");
  const [poster, setPoster] = useState(`${userDetails.firstName} ${userDetails.lastName}`);
  const [branch, setBranch] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [preacher, setPreacher] = useState("");
  const [service, setService] = useState("");
  const [loadingMusic, setLoadingMusic] = useState(true);
  const [audioLength, setAudioLength] = useState(null)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
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
    let media = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });

    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });

    // console.log(media);
    setAudioLength(media.assets.length)
    setAudioFiles(media.assets);
  };

  const willUpload = (audio) => {
    Alert.alert(`Note`, `Do you want to upload this audio?`, [
      { text: "No", onPress: () => console.log("") },
      { text: "Yes", onPress: () => setCanFilForm(true) },
    ]);
  };

  const handePress = async () => {
    let audio = selectedAudio;
    if(!title || !event || !poster || !fileName || !preacher || !podcastType ){
        Alert.alert(`ERROR!!!`, `Fill all fields please.`, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          return
    }
    setMusicUploadMsg('Preparing....')
    setFetching(true)
    const rawAudio = await fetch(audio?.uri);
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
        console.log(prog, "%")
        setVideoProgress(prog);
        setMusicUploadMsg(`Uploading.... ${prog}%`)
        prog === 100 && setMusicUploadMsg("Getting things ready. Please wait.");
      },
      (err) => {
        Alert.alert(`ERROR!!!`, `Error while uploading audio`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        console.log(err);
        setMusicUploadMsg(`Add Song`)
        setFetching(false)
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          uploadUrlFromFirebaseToDb(url)
        );
      }
    );
  };

  const uploadUrlFromFirebaseToDb = async (url) => {
  try {
    setMusicUploadMsg(`Adding song. Please wait.`)
    const res = await fetch(`http://192.168.43.224:8000/audio/addAudio`, {
        body: JSON.stringify({
          title,
          podcastUrl:url,
          event,
          podcastType,
          poster,
          branch: "",
          fileName,
          preacher,
          service: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = await res.json();
      console.log(data, "as data")
      if (data?.success == false) {
        setMusicUploadMsg(`Add Song`)
        setFetching(false)
        Alert.alert(`ERROR!!!`, `Something went wrong. Sorry.`, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        return;
      }
      setMusicUploadMsg("Upload Completed! Going back to Podcast page.");
      setTimeout(() => {
          navigation.push("PodcastSermons")
      }, 2000);
      return;
  } catch (error) {
    Alert.alert(`ERROR!!!`, `Something went wrong. Sorry.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    setMusicUploadMsg(`Add Song`)
    setFetching(false)
  }
 
  };

  useEffect(() => {
    setTitle(selectedAudio?.filename)
    setFileName(selectedAudio?.filename)
  }, [selectedAudio])
  

  const displayAudios = useMemo(() => audioFiles.map((audio, index) => {
    audioFiles.length - 1 == index && setLoadingMusic(false)
    return (
      <TouchableOpacity
        onPress={() => {
            
          setSelectedAudio(audio);
          willUpload(audio);
        }}
        key={index}
        style={styles.audioTitle}
      >
        <Text>{audio.filename}</Text>
      </TouchableOpacity>
    );
  }), [audioFiles.length])

  const formFill = (
    <View style={styles.container}>
      <TextInput
      value={title}
        onChangeText={(e) => setTitle(e)}
        style={styles.input}
        placeholder="Audio Title"
      />
      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={event}
          onValueChange={(itemValue, itemIndex) => setEvent(itemValue)}
        >
          <Picker.Item label="Select Event" value="" />
          <Picker.Item label="Sunday Service" value="sunday_service" />
          <Picker.Item label="Friday Vigil" value="friday_vigil" />
          <Picker.Item label="Wednessday Bible Study" value="wed_bible_study" />
        </Picker>
      </View>

      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={podcastType}
          onValueChange={(itemValue, itemIndex) => setPodcastType(itemValue)}
        >
          <Picker.Item label="Podcast Type" value="" />
          <Picker.Item label="Sermon" value="sermon" />
          <Picker.Item label="Word Bliss" value="word_bliss" />
          <Picker.Item label="Truevine Talkshows" value="truevine_talkshows" />
        </Picker>
      </View>
      <View style={styles.roleBox}>
        <Picker
          style={styles.role}
          selectedValue={preacher}
          onValueChange={(itemValue, itemIndex) => setPreacher(itemValue)}
        >
          <Picker.Item label="Choose Preacher" value="" />
          <Picker.Item label="Pst Jude Eke (G.O)" value="jude_eke" />
          <Picker.Item label="Pst Matthew Osas" value="mathew_osas" />
          <Picker.Item label="Pst Chijoke Monday" value="chijoke_monday" />
        </Picker>
      </View>

      <TouchableOpacity onPress={!fetching && handePress} style={styles.btn}>
        <Text style={styles.btnText}>{musicUploadMsg}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>Add Audio Below</Text>
      {selectedAudio && (
        <Text style={styles.heading2}>
          Audio selected: {selectedAudio.filename}
        </Text>
      )}
      <ScrollView contentContainerStyle={styles.body}>
        {/* <FlatList
      data={audioFiles}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.audioTitle}><Text>{item.filename}</Text></TouchableOpacity>
      )}
    /> */}
        {loadingMusic && (
          <Text style={styles.heading2}>Loading Audio FIles....</Text>
        )}
        {!loadingMusic && (!canFillForm ? displayAudios : formFill)}
        {/* {displayAudios} */}
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
    paddingBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  heading2: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "bold",
    color: "whitesmoke",
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
    fontSize: 14,
    color: "black",
  },
  audioTitle: {
    height: 30,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "1%",
    alignItems: "center",
    width: "100%",
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "whitesmoke",
    borderRadius: 2,
  },
  roleBox: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
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
});
