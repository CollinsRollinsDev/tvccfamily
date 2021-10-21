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
  ScrollView
} from "react-native";

const About = () => {
  return (
    <View style={styles.body}>
      <Header name="About" leftSide="menu" />
      <ScrollView>
      <View style={styles.imgView}>
        <Image
          style={styles.stretch}
          source={require("../../../assets/aboutusImg.jpg")}
        />
      </View>
      <View style={styles.words}>
        <Text style={styles.heading}>Mission Statement</Text>
        <Text style={styles.content}>
          The recovery and empowerment of the lost belivers with true knowledge
          of the kingdom of, cultures, rights and privileges.
        </Text>

        <Text style={styles.heading}>Vision Statement</Text>
        <Text style={styles.content}>
          To gather all Natives of the Kingdom in readiness for the lord's
          coming.
        </Text>

        <Text style={styles.heading}>Overall Objective</Text>
        <Text style={styles.content}>
          Total Recovery of men for the Kingdom of God, especially the lost
          members of the household of God.
        </Text>

        <Text style={styles.heading}>Pillars of Faith</Text>
        <Text style={styles.content}>
          Truevine Christian Centre has God's mandate for Total Gospel which is
          principally to inculate Kingdom Culture and Virtues, and the
          consequent benefits, which are the Rights and Privileges of every
          citizens of the Kingdom. In this end time, the word of God has been
          severly compromised such that today, there are praying centres of all
          sorts with ultimate goal of enriching themselves, which as a matyter
          of necessity compelled many to adulterate the Worf of life.
        </Text>

        <Text style={styles.contentEnd}>
          At Truevine, God's words is the basis for the gospel. It is the nub of
          the ministry's beliefs and teachings. We live on the Word and convey
          spiritual values from which our manual are developed as inspired by
          the Holy Spirit.Total Recovery of men for the Kingdom of God,
          especially the lost members of the household of God.
        </Text>
      </View>
      </ScrollView>
    </View>
    
  );
};

export default About;

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: "#3464eb",
    width: "100%",
    // paddingBottom: 30,
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
