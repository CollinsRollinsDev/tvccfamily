import React from "react";
import { useState, useEffect, useCallback } from "react";
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
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails } from "../../reduxStore/actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatGrid } from 'react-native-super-grid';

const Admin = ({ navigation }) => {
  const [items, setItems] = React.useState([
    { name: 'Assign Leader To Group', path:'AssignLeader' },
    { name: 'Assign Deputy Leader To Group', path:''},
    { name: 'Send Message To All Members', path:'' },
    { name: 'Add An Event', path:'' },
    { name: 'View Councelling Requests', path:'' },
    { name: 'Sign Out', path:'' },
  ]);
 return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Welcome Admin, what are you doing now?
      </Text>

      <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => item.path !== '' && navigation.push(item.path)} style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />

    </View>
 )
}

export default Admin;

const styles = StyleSheet.create({
  body: {
    padding:20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3464eb",
    minHeight: "100%",
    marginBottom: 50,
  },
  heading1: {
    fontSize: 17,
    paddingBottom:20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor:'white',
  },
  itemName:{
    textAlign:'center',
    fontWeight:'600'
  },
})