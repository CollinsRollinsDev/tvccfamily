import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { Provider } from "react-redux";
import { Store } from "./reduxStore/store.js";
import Index from "./components/Landing/Index";
export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.main}>
        <Index />
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
  },
});
