import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Textarea from 'react-native-textarea';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  Alert
} from "react-native";
import myNotes from "../../../assets/Notes.json";
import { useSelector, useDispatch } from "react-redux";
 

const Note = ({navigation}) => {
const { currentTitle, currentPostBody, currentMinistering, userDetails} =
    useSelector((state) => state.useTheReducer);

    const [addTitle, setAddTitle] = useState()
    const [addMinistering, setAddMinistering] = useState()
    const [addPost, setAddPost] = useState()
    const [exId, setExId] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

// let item = AsyncStorage.getItem("myNotes");
// console.log(item)
  const handleChapterPress = async (event) => {};
  const handleSave = async() => {

    if(addTitle && addMinistering && addPost && addPost != '' && addTitle != '' && addMinistering != ''){
      
    let item = await AsyncStorage.getItem("myNotes");
    let newItem = await JSON.parse(item)
    console.log("newItem:",newItem)
    let id = await newItem.length + 1;

    let newPost = {
     id: id,
     title: addTitle,
     ministering: addMinistering,
     post: addPost
    }

    const isCurrent = await newItem.filter(note => {
      return note.id == exId
    })
    console.log("isCurrent:", isCurrent)

    if(isCurrent.length != 0){
      const updated = newItem.map(item => {
        if(item.id == exId){
          item.title = addTitle;
          item.ministering = addMinistering;
          item.post = addPost
        }
        return item
      })
      // console.log(updated)
      await AsyncStorage.setItem("myNotes", JSON.stringify(updated));

      console.log("updated....")

    } else{
   // if(item != null){
      // let newPosts = await newItem.push(newPost);
      let newPosts = await [newPost, ...newItem];
      let extractedId = await newPosts[0].id;
      setExId(extractedId);
      if(extractedId){
        await AsyncStorage.setItem("myNotes", JSON.stringify(newPosts));
      }

      console.log("created.....")
    // }
    }

  
    // await AsyncStorage.setItem("myNotes", JSON.stringify(myPost));
    
    // if(!addTitle || !addPost || !addMinistering){
    //   Alert.alert(`ERROR!!!`, `Seem like some fields are missing. Please fix and try again.`, [
    //     { text: "OK", onPress: () => console.log("OK Pressed") },
    //   ]);
    // } else{
    //   const res = await fetch(`https://tvccserver.vercel.app/notes?id=${userDetails.id}`, {
    //     body: JSON.stringify({
    //       title: addTitle,
    //       ministering: addMinistering,
    //       body: addPost
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //   });
  
    //   const data = await res.json();
    //   if(data.success === true){
    //     Alert.alert(`Message`, `${data.response}`, [
    //       { text: "OK", onPress: () => navigation.push("Notes") },
    //     ]);
    //   } else{
    //     Alert.alert(`Unsuccessfull!`, `${data.response}`, [
    //       { text: "OK", onPress: () => console.log("OK Pressed") },
    //     ]);
    //   }
    // }

  } else{

  }
}

  useEffect(() => {
     handleSave()
    }, [addPost, addTitle, addMinistering])


  return (
    <View style={styles.body}>
      {/* <Header name="Add a Note" leftSide="Search" /> */}
        <View style={styles.notePreviewContainer}>
        <TextInput onChangeText={(e) => setAddTitle(e)} style={styles.input} placeholder="Title Here...." />
        <TextInput onChangeText={(e) => setAddMinistering(e)} style={styles.input} placeholder="Ministering Here...." />
        <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.inputPost}
            onChangeText={(e) => setAddPost(e)}
            // defaultValue={"here"}
            // maxLength={120}
            placeholder={"Start Adding Note Here...."}
            placeholderTextColor={'#5661db'}
            underlineColorAndroid={'transparent'}
            // numberOfLines={2}
  />
        </View>
        {/* <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.content}>Save Post</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "whitesmoke",
    minHeight: "100%",
  },
  notePreviewContainer: {
    minHeight: 500,
    width: "100%",
    padding: "2%",
  },

  input: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderBottomColor: 'black',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    textAlign: 'left',
    fontSize: 18,
},
inputPost:{
    backgroundColor: 'transparent',
    width: '100%',
    minHeight: 400,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 17,
    marginTop: 20,
},
saveBtn: {
    backgroundColor: 'blue',
    height: 40,
    width: 130,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: "90%",
    right: '5%',
},
content: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
},
// textareaContainer: {
//     lineHeight: 500
// }
});
