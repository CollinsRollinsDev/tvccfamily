import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import hymns from "../../assets/hymns.json";

const HymnRead = ({ route, navigation }) => {
  const { title, id } = route.params;
  const [currentHymn, setCurrentHymn] = useState({});

  const getCurrentHymn = async () => {
    const hymn = await hymns.filter(
      (hymn) => hymn.title === title && hymn.id === id
    );
    if (!hymn) {
      return;
    }
    setCurrentHymn(hymn[0]);
  };

  useEffect(() => {
    getCurrentHymn();
  }, []);

  const mapped = currentHymn?.verses?.map((verse, index) => {
    return (
      <>
        <View key={index} style={styles.versesBox}>
          {verse.map((v, index) => (
            <Text key={index} style={styles.versesText}>
              {v}
            </Text>
          ))}
        </View>
        {currentHymn?.chorus.length > 0 &&
            <View style={styles.chorusBox}>
        {  currentHymn.chorus.map((c) => (
              <Text style={styles.chorusText}>{c}</Text>
          ))}
            </View>
          }
      </>
    );
  });

  return (
    <View style={styles.body}>
      <View style={styles.titleSpace}>
        <Text style={styles.hymnTitle}>{title}</Text>
      </View>
      <ScrollView>
        {mapped}
      </ScrollView>
    </View>
  );
};

export default HymnRead;

const styles = StyleSheet.create({
  body: {
    minHeight: "100%",
    width: "100%",
    padding: "2%",
    paddingTop: 60,
  },
  titleSpace: {
    // backgroundColor: "green",
    height: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  hymnTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "brown",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  versesBox: {
    height: "auto",
    width: "100%",
    marginLeft: "5%",
    marginBottom: 30,
  },
  versesText: {
    fontSize: 15,
  },
  chorusBox: {
    height: "auto",
    width: "100%",
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  chorusText: {
    fontSize: 15,
    color: "brown",
    textAlign: "center",
  },
});
