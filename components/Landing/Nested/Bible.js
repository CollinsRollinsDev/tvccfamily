import React from "react";
import { useState, useEffect, useRef } from "react";
import Header from "../../Header/Header";
// import { SearchBar } from 'react-native-elements';
import { Picker } from "@react-native-picker/picker";
import scriptures from "../../../assets/newBible.json";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentBook,
  setCurrentChapter,
  setCurrentVerse,
  setCurrentScripture,
} from "../../../reduxStore/actions";
import Slider from 'react-slick'
import Slick from 'react-native-slick';

import {
  AppRegistry,
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
import SelectTestament from "./SelectTestament";
import useSafeState from "react-use-safe-state";

const updateSearch = () => {};

const Bible = ({ navigation }) => {

  const { currentBook, currentChapter, currentVerse, currentScripture } =
    useSelector((state) => state.useTheReducer);
  // const state = useSelector(state => state.state)
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  // console.log(scriptures);
  const [search, updateSearch] = useState("");
  let [selectedBook, setSelectedBook] = useState();
  const [userPickedOld, setUserPickedOld] = useState();
  let [selectedChapter, setSelectedChapter] = useSafeState();
  const [displayChapters, setDisplayChapters] = useState(true);
  let [verseArr, setVerseArr] = useState();
  let [verseSelected, setVerseSelected] = useState(null);
  let [testamantPicked, setTestamentPicked] = useState(null);
  // let [refreshChapter, setRefreshChapter] = useState();
  
  let testamentIndex = 0;

  useEffect(() => {
    testamantPicked === "newTestament" ? testamentIndex = 0 : testamentIndex = 1;
    testamantPicked === "newTestament" ? setSelectedBook("Matthew") : setSelectedBook("Genesis")
  }, [testamantPicked])
  

  const displayOldTestanmentMapped = scriptures[0].books.map((book, index) => {
      return (
          <Picker.Item key={index} label={book.name} value={book.name} />
      )
  })
  
  const displayNewTestanmentMapped = scriptures[1].books.map((book, index) => {
      return (
          <Picker.Item key={index} label={book.name} value={book.name} />
      )
  })

  // useEffect(() => {
  //   const set
  // }, [selectedBook])
  const handleChapterPress = (number) => {
    setSelectedChapter(prevState => prevState = number);
    setDisplayChapters(false);

  }

  const handleVersePress = (number) => {
    setVerseSelected(prevState => prevState = number)
    navigation.push("ReadPage", { testament: testamantPicked, book: selectedBook, chapter: selectedChapter, verse: verseSelected});

  }

  const displayChaptersMapped = scriptures[testamantPicked == "newTestament" ? 1 : 0]?.books?.map((book, index) => {
      if(book.name === selectedBook){
        const renderChapter = book.chapters
         return <FlatList
          key={index}
          contentContainerStyle={styles.grid}
          numColumns={4}
          data={renderChapter}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChapterPress(item.chapter)}
              style={styles.individualChapters}
            >
              <Text style={styles.numbers}>{item.chapter}</Text>
            </TouchableOpacity>
            // {displayChaptersMapped}
          )}
        />
      }
  })

  const displayVerseMapped = (selectedBook && selectedChapter) && scriptures[testamantPicked == "newTestament" ? 1 : 0]?.books?.map((book, index) => {
    if(book.name === selectedBook){
      return book?.chapters?.map((item, index) => {
        if(item?.chapter == selectedChapter){
          return <FlatList
          key={index}
          contentContainerStyle={styles.grid}
          numColumns={4}
          data={item?.verses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            //  console.log(item.verse)
            <TouchableOpacity
              onPress={() => {
                handleVersePress(item.verse);
              }}
              style={styles.individualVerses}
            >
              <Text style={styles.numbers}>{item.verse}</Text>
            </TouchableOpacity>
          )}
        />
        }
      })
      
    }
  })



  return (
    <View style={styles.body}>
      {/* <Header name="Bible" leftSide="Search" /> */}
    
      <View style={styles.top}>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Search Here..."
        />
      </View>

                    {/* TODO: stop here */}

      <SelectTestament setTestamentPicked={setTestamentPicked} />

      {testamantPicked ? (
        // Display the bible book select part
        <View style={styles.selector}>
          {testamantPicked == "oldTestament" ? (
            <Text style={styles.testamentDecleartion}>Old Testament</Text>
          ) : testamantPicked == "newTestament" ? (
            <Text style={styles.testamentDecleartion}>New Testament</Text>
          ) : null}

          {testamantPicked == "oldTestament" ? (
              <View style={styles.bookArea}>
              <Picker
                style={styles.oldBook}
                selectedValue={selectedBook}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedBook(prevState=> prevState = itemValue)
                }
              >
                {displayOldTestanmentMapped}
              </Picker>
            </View>
            
          ) : testamantPicked == "newTestament" ? (
            <View style={styles.bookArea}>
              <Picker
                style={styles.oldBook}
                selectedValue={selectedBook}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedBook(itemValue)
                }
              >
                {displayNewTestanmentMapped}
              </Picker>
            </View>
          ) : null}

          {displayChapters ? (
            <Text style={styles.chapterDecleartion}>Chapters</Text>
          ) : null}
          {!displayChapters ? (
              <Text style={styles.verseDecleartion}>Verses</Text>
            ) : null}
          <ScrollView>


            {/* TODO: to modify soon */}
      
            <View style={styles.chapterArea}>
              {displayChapters ? (
                    displayChaptersMapped
                  
              ) : null}
            </View>

            {/* {!displayChapters ? (
              <Text style={styles.verseDecleartion}>Verses</Text>
            ) : null} */}



            {/* TODO: */}
            <View style={styles.verseArea}>
              {!displayChapters ? (
                // <FlatList
                //   contentContainerStyle={styles.grid}
                //   numColumns={4}
                //   data={verseArr ? verseArr[0].verses : null}
                //   keyExtractor={(item, index) => index.toString()}
                //   renderItem={({ item }) => (
                //     //  console.log(item.verse)
                //     <TouchableOpacity
                //       onPress={() => {
                //         handleVersePress(item.verse);
                //         navigation.push("ReadPage");
                //       }}
                //       style={styles.individualVerses}
                //     >
                //       <Text style={styles.numbers}>{item.verse}</Text>
                //     </TouchableOpacity>
                //   )}
                // />
                displayVerseMapped
              ) : null}
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};

export default Bible;

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#3464eb",
    width: "100%",
    height: "100%",
    // paddingBottom: 30,
  },
  top: {
    height: 60,
    width: "100%",
    //   backgroundColor: 'green'
  },
  getter: {},
  selector: {},
  oldBook: {
    height: "100%",
    width: "100%",
    //   color: 'white',
  },
  bookArea: {
    width: "50%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: "25%",
    marginTop: 20,
    marginBottom: 30,
  },
  testamentDecleartion: {
    textAlign: "center",
    fontSize: 23,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    height: 30,
    width: "60%",
    marginLeft: "20%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "2%",
  },
  chapterArea: {
      // backgroundColor: 'red',
    minHeight: 50,
    width: "100%",
    marginBottom: 10,
    // marginTop: -150,
    padding: "2%",
    flexDirection: "row",
    // paddingBottom: 110,
    paddingBottom:100,
  },

  verseArea: {
    // backgroundColor: 'red',
    minHeight: 50,
    width: "100%",
    marginBottom: 250,
    padding: "2%",
    // paddingBottom: '10%',
    flexDirection: "row",
    // marginTop: -417,
    position: "relative",
    top: "-35%",
  },

  individualChapters: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    //   borderColor: 'white',
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    margin: 15,
  },

  individualVerses: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    //   borderColor: 'white',
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    margin: 15,
  },

  numbers: {
    fontSize: 20,
    color: "white",
    //   textShadowColor: 'black',
    //   textShadowRadius: 10,
  },

  chapterDecleartion: {
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: "3%",
    fontSize: 19,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
  },

  verseDecleartion: {
    marginLeft: "5%",
    marginBottom: "3%",
    fontSize: 19,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
  },
  grid: {
    flex: 1,
    height: "100%",
    width: "100%",
    // marginBottom: 32,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
