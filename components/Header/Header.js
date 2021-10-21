import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
} from "react-native";

const Header = ({name, leftSide}) => {
    return (
        <View style={styles.headerBody}>
            <View style={styles.left}>
                <View style={styles.dpContainer}>

                </View>
            </View>

            <View style={styles.center}>
                <Text style={styles.textSpot}>{name}</Text>
            </View>

            <View style={styles.right}>
                <Text>{leftSide}</Text>
            </View>
        </View>
    )
}

export default Header


const styles = StyleSheet.create({
     headerBody:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3464eb',
        flexDirection: 'row',
        height: 60,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#bdc1c9'

    },
    left: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 4,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dpContainer: {
        height: 50,
        width: 50,
        backgroundColor: 'grey',
        borderRadius: 50,

    },
    textSpot: {
        fontSize: 21,
        color: 'white',
        // fontWeight: '700',
    }

})