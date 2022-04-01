// display error message for beta version limitations
import {
  Alert,
} from "react-native";

const betaVersion = async() => {
  return (
    Alert.alert(`You are on beta version.`, `Sorry, this feature is only avaliable on the release version. You are currently using the beta app version 1.0.0`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ])
  )
}

export default betaVersion;