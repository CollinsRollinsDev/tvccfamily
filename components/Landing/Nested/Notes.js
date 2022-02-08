import React from "react";
import { useState, useEffect, useCallback } from "react";
import Header from "../../Header/Header";

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
  ListViewBase,
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
    setCurrentTitle,
    setCurrentMinistering,
    setCurrentPostBody,
    setCurrentPostId,
    
  } from "../../../reduxStore/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
 
const Notes = ({navigation}) => {

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)
      fetchNote();
    });
  }, []);




    const {userDetails, currentTitle, currentPostBody, currentMinistering} =
    useSelector((state) => state.useTheReducer);
  const dispatch = useDispatch();

    const [displayNotePage, setDisplayNotePage] = useState(false)
    const [notes, setNotes] = useState([])

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleChapterPress = async (id, title, ministering, post) => {
    setDisplayNotePage(true);
    // navigation.push("Note")
    dispatch(setCurrentTitle(title))
    dispatch(setCurrentMinistering(ministering))
    dispatch(setCurrentPostBody(post))
    dispatch(setCurrentPostId(id))
    console.log("id:", id)
    console.log("userID", userDetails.id)
    // console.log("title:", title)
    // console.log("ministering:", ministering)
    // console.log("post:", post)
  };

  const handleAddNote = () => {
    navigation.push("AddNote")
  }


  const fetchNote = async() => {
    const res = await fetch(`http://192.168.43.49:8080/notes?id=${userDetails.id}`);
    const data = await res.json();
    if(data.success === true){
      setNotes(data.response.reverse())
    } else{
      Alert.alert(`ERROR!!!`, `${data.response}.`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    const item = await AsyncStorage.getItem("myNotes");
    setNotes(JSON.parse(item));
    // console.log("notes",notes)
  }

  useEffect(() => {
  fetchNote();
  }, [])

  const handleLongPressDelete = async(userId, postId) => {
    Alert.alert(`Warning!`, `Are you sure you want to delete this? It will be lost forever!`, [
                 
      {
        text: "No",
        onPress: () =>
          console.log("No Clicked")
      },
      {
        text: "Yes",
        onPress: async() =>{

          const res = await fetch("http://192.168.43.49:8080/notes", {
            body: JSON.stringify({
              userId: userId,
              postId: postId
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "DELETE",
          });

          const response = await res.json();

          if (response.success === true) {
            Alert.alert(`SUCCESSFUL!`, `Note has been deleted.`, [
              {
                text: "OK",
                onPress: () => {
                  navigation.push("Notes")
                },
              },
            ]);
          } else {
            Alert.alert(`ERROR!`, `Something went wrong!.`, [
              { text: "OK", onPress: () => console.log("err") },
            ]);
          }

        }
      },
    ]);
  }


  return (
    <View style={styles.body}>
      <Header name="Notes" leftSide="Search" />
      <ScrollView 
         refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.notePreviewContainer}>
          <FlatList
            data={notes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              onLongPress={() => {
                Alert.alert(`Message!`, `Do you wish to delete this note?`, [
                 
                  {
                    text: "No",
                    onPress: () =>
                      console.log("No Clicked")
                  },
                  {
                    text: "Yes",
                    onPress: () =>
                      handleLongPressDelete(
                        userDetails.id,
                        item._id
                      ),
                  },
                ]);
              }}

                onPress={async() => {
                  // await handleChapterPress(item._id, item.title, item.ministering, item.body);
                  await handleChapterPress(item.id, item.title, item.ministering, item.post);
                    navigation.push("Note");
                }
            }
              >
                <View style={styles.preview}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.preacher}>{item.ministering}</Text>
                  <Text style={styles.excerpt}>
                    {item.post.substring(0, 70) + "..."}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* {
            displayNotePage ? <Note  /> : null
        } */}
      </ScrollView>

      <TouchableOpacity onPress={handleAddNote} style={styles.addBox}>
            {/* <Text style={styles.icon}>
                add
            </Text> */}
            <FontAwesome5 name={'plus'} size={20} color={'white'}/>
      </TouchableOpacity>

    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "whitesmoke",
    minHeight: "100%",
  },
  notePreviewContainer: {
    minHeight: 500,
    width: "100%",
    padding: "2%",
    marginBottom:65,
  },
  preview: {
    height: 90,
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    marginTop: 10,
    padding: "1%",
    paddingLeft: "5%",
  },
  title: {
    color: "black",
    fontSize: 17,
    textAlign: "left",
    fontWeight: "bold",
  },
  excerpt: {
    color: "black",
    fontSize: 15,
    textAlign: "left",
    fontWeight: "500",
  },
  preacher: {
    color: "black",
    fontSize: 16,
    textAlign: "right",
    fontWeight: "600",
    marginRight: "5%",
  },
  addBox: {
    backgroundColor: 'blue',
    height: 70,
    width: 70,
    borderRadius:70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: "80%",
    right: '5%',
  },
  icon: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 17,
  }
});
