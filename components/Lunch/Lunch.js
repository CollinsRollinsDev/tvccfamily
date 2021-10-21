import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useState } from "react";

const Lunch = () => {
    return (
        <View style={styles.body}>
              {/* <ImageBackground source={require("../../assets/church1.jpg")}  resizeMode="cover" style={styles.image}> */}
            <View style={styles.layout}>
                <View style={styles.headbox}>
                    <Text style={styles.header}>
                        TRUEVINE
                    </Text>
                    <Text style={styles.secondLine}> Christain Center </Text>
                </View>
                {/* <View style={styles.bodyBox}>
                </View> */}
             </View>
             {/* </ImageBackground> */}
             <TouchableOpacity style={styles.btnBorder}>
                <Text style={styles.btnText}>Continue</Text>
             </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bd3508',
    },
    layout:{
        height: 400,
        width: 300,
    },
    headbox: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // bodyBox: {
    //     flex: 4,
    //     width: '100%',
    //     height: '100%',
    // },
    header:{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: -100,
        color: 'white'
    },
    secondLine:{
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
        color: 'white'
    },
    btnBorder:{
        backgroundColor: "white",
        color: "brown",
        padding: '2%',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    btnText:{
        fontWeight: 'bold',
        fontSize: 17,
        color: '#bd3508'
    }
});

export default Lunch