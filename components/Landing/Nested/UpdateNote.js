import React from "react";
import { useState, useEffect } from "react";
import Header from "../../Header/Header";
import Textarea from 'react-native-textarea';

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
  Dimensions
} from "react-native";
import myNotes from "../../../assets/Notes.json";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateTebSwitch } from "../../../reduxStore/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdateNote = ({navigation, currentTitle, currentMinistering, currentPostBody, setTabSwitch}) => {
const {userDetails, updateTabSwitch, currentPostId} =
    useSelector((state) => state.useTheReducer);
    const dispatch = useDispatch()

    let [addTitle, setAddTitle] = useState(currentTitle)
    let [addMinistering, setAddMinistering] = useState(currentMinistering)
    let [addPost, setAddPost] = useState(currentPostBody)

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // console.log(currentPostId)

  const handleChapterPress = async (event) => {};
  const handleSave = async() => {

    let item = await AsyncStorage.getItem("myNotes");
    let newItem = await JSON.parse(item)

    // console.log(addPost)

    if(!addTitle && !addPost && !addMinistering){
      Alert.alert(`ERROR!!!`, `Seem like some fields are missing. Please fix and try again.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else{

      const updated = newItem.map(item => {
        if(item.id == currentPostId){
          item.title = addTitle;
          item.ministering = addMinistering;
          item.post = addPost
        }
        return item
      })
      // console.log(updated)
      await AsyncStorage.setItem("myNotes", JSON.stringify(updated));

      console.log("updated....")

    //   const res = await fetch(`https://tvccserver.vercel.app/notes?userId=${userDetails.id}&postId=${currentPostId}`, {
    //     body: JSON.stringify({
    //       title: addTitle,
    //       ministering: addMinistering,
    //       body: addPost
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "PATCH",
    //   });
  
    //   const data = await res.json();
    //   if(data.success === true){
    //     Alert.alert(`SUCCESSFUL!`, `${data.response}`, [
    //       {
    //         text: "OK",
    //         onPress: async() => {
    //           dispatch(setUpdateTebSwitch(false))
    //           navigation.push("Note")
    //         },
    //       },
    //     ]);
    // } else{
    //   Alert.alert(`ERROR!`, `Something went wrong!.`, [
    //     { text: "OK", onPress: () => console.log("err") },
    //   ]);
    // }
   
  }

  }

  const screenHeight = Dimensions.get('window').height

  return (

        <View style={styles.container}>
            {/* <Header name="Edit Your Note" leftSide="Search" /> */}
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <TextInput defaultValue={currentTitle} onChangeText={(e) => setAddTitle(e)} style={styles.inputArea} placeholder="Title Here...." />
              <TextInput defaultValue={currentMinistering} onChangeText={(e) => setAddMinistering(e)} style={styles.inputArea} placeholder="Ministering Here...." />

              <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.inputPostArea}
            onChangeText={(e) => setAddPost(e)}
            defaultValue={currentPostBody}
            // maxLength={120}
            placeholder={"Start Adding Note Here...."}
            placeholderTextColor={'#5661db'}
            underlineColorAndroid={'transparent'}
            // numberOfLines={2}
  />

              </ScrollView>
              <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
             <Text style={styles.content}>Save Post</Text>
         </TouchableOpacity>
        </View>
  );
};

export default UpdateNote;

const styles = StyleSheet.create({
 container:{
  width: '100%',
  height: '100%',
  // backgroundColor: 'red',
  // marginBottom: 200,

 },
 inputArea:{
  backgroundColor: 'transparent',
  width: '100%',
  height: 50,
  borderBottomColor: 'black',
  borderTopColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  textAlign: 'left',
  fontSize: 18,
  marginLeft: '2%'
 },
 textareaContainer:{
  margin: 10,
  minHeight: '90%',
  fontSize: 17,
  flex:1,
  // marginBottom: 200,
 },
 inputPostArea:{
   fontSize: 17,
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

});
