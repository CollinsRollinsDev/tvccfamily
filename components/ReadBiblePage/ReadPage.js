import React from "react";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
// import { SearchBar } from 'react-native-elements';
import { Picker } from "@react-native-picker/picker";
import scriptures from "../../assets/bibleKJV.json";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentBook,
  setCurrentChapter,
  setCurrentVerse,
  setCurrentScripture,
} from "../../reduxStore/actions";

const ReadPage = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const { currentBook, currentChapter, currentVerse, currentScripture } =
    useSelector((state) => state.useTheReducer);
  console.log("currentScripture", currentScripture);

  return (
    <View style={styles.body}>
      <Header name={currentBook && currentChapter ? `${currentBook} chapter ${currentChapter}` : "Loading..."} leftSide="Search" />
      <ScrollView style={styles.scroll}>

        <FlatList
          // contentContainerStyle={styles.grid}
          // numColumns={4}
          data={currentScripture ? currentScripture[0].verses : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            // console.log(item.verse)
            <TouchableOpacity onPress={() => handleChapterPress(item.chapter)}>
              <View style={styles.scripture}>
                <View style={styles.eachChapter}>
                  <Text style={styles.verseText}>
                    <Text style={styles.verseCount}> {item.verse}.</Text>{" "}
                    {item.text}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ReadPage;

const styles = StyleSheet.create({
  body: {
    minHeight: "100%",
    width: "100%",
    // marginBottom: 100,
  },
  scroll: {
    marginBottom: 80
  },
  scripture: {
    width: "100%",
    color: "black",
    marginBottom: 5,
  },
  eachChapter: {
    width: "100%",
    padding: "2%",
  },
  verseText: {
    fontSize: 18,
    width: "100%",
  },
  verseCount: {
    color: "#c42e04",
    fontWeight: "bold",
  },
});
