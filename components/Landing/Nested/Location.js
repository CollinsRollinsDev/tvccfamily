import React from "react";
import { useState } from "react";
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
} from "react-native";

const Location = () => {
  return (
    <View style={styles.body}>
      <Header name="Location" leftSide="menu" />
      <ScrollView>
        <View style={styles.imgView}>
          <Image
            style={styles.stretch}
            source={require("../../../assets/locateImg.jpg")}
          />
        </View>


        <View style={styles.words}>
        <Text style={styles.heading}>Benin HeadQuater</Text>
        <Text style={styles.content}>
          bla bla bla bla bla bla bla bla bla bla bla bla bla
        </Text>

        <Text style={styles.heading}>Lagos Branch</Text>
        <Text style={styles.content}>
          No 6, Enilolobo Street, Beside Dopemu Market, Agege, Lagos, Nigeria, West-Africa.
        </Text>

      </View>
      </ScrollView>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#3464eb",
    width: "100%",
    minHeight: "100%",
  },
  stretch: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  imgView: {
    height: 350,
    width: "100%",
    position: "relative",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  content: {
    fontSize: 15,
    color: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  contentEnd: {
    fontSize: 15,
    color: "white",
    marginTop: 10,
    marginBottom: 70,
  },
  words: {
    // flex: 1,
    minHeight: 500,
    width: "100%",
    padding: "2%",
    // paddingBottom: 30,
  },
});
