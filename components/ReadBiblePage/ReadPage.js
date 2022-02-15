import React from "react";
import { useState, useEffect } from "react";
// import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentBook,
  setCurrentChapter,
  setCurrentVerse,
  setCurrentScripture,
} from "../../reduxStore/actions";
import scriptures from '../../assets/newBible.json';
import { useSwipe } from "../../useSwipe";

const ReadPage = ({route, navigation}) => {
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 100)
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const { testament, book, chapter, verse} = route.params;
  
  const [myTestament, setMyTestament] = useState(testament);
  const [myBook, setMyBook] = useState(book);
  const [myChapter, setMyChapter] = useState(chapter);
  
  
  const { currentBook, currentChapter, currentVerse, currentScripture } =
  useSelector((state) => state.useTheReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentBook(book))
    dispatch(setCurrentChapter(chapter))
  }, [])

  function onSwipeLeft(){
    console.log('SWIPE_LEFT')
}

function onSwipeRight(){
    console.log('SWIPE_RIGHT')
    // setMyBook("John")
    // dispatch(setCurrentBook(book))
    // dispatch(setCurrentChapter(chapter))
}

const handleChapterPress = () => {
  // do nothing
}


  const mappedVerse = scriptures[myTestament == "newTestament" ? 1 : 0]?.books.map((mappedbook, index) => {
    if(mappedbook.name === myBook){
      return mappedbook.chapters.map((episode, index) => {
        if(episode.chapter == myChapter){
         return <FlatList
         key={index}
          // contentContainerStyle={styles.grid}
          // numColumns={4}
          data={episode.verses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            // console.log(item.verse)
            <View onPress={() => handleChapterPress(item.chapter)}>
              <View style={styles.scripture}>
                <View style={styles.eachChapter}>
                  <Text style={styles.verseText}>
                    <Text style={styles.verseCount}> {item.verse}.</Text>{" "}
                    {item.text}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        }
      })
    }
  })
  

  return (
    <View style={styles.body}>
      {/* <Header name={currentBook && currentChapter ? `${currentBook} chapter ${currentChapter}` : "Loading..."} leftSide="Search" /> */}
      <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={styles.scroll}>
        {mappedVerse}
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
  // scroll: {
  //   marginBottom: 80
  // },
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
