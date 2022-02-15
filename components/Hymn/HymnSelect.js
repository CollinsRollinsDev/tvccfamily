import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import hymns from "../../assets/hymns.json";
import { useEffect } from "react";

const HymnSelect = ({ navigation }) => {
  // const [searchTerms, setSearchTerms] = useState();
  const [returnedHymn, setReturnedHymn] = useState([]);
  const [selectedHymn, setSelectedHymn] = useState({ title: "", id: "" });

  // console.log(hymns)

  const searchHymn = async (e) => {
    let match = e.match(/^[a-zA-Z ]*/);
    let match2 = e.match(/\s*/);
    if (match2[0] === e) {
      return;
    }
    const result = await hymns.filter((hymn) => hymn.title.startsWith(e));
    // console.log(result.slice(0, 10), "setting hymns")
    setReturnedHymn(result.slice(0, 10));
  };

  const select_and_push = async (title, id) => {
    setSelectedHymn({ title, id });
    navigation.navigate("HymnRead", { title, id });
    // console.log(selectedHymn)
  };

  useEffect(() => {
    console.log(selectedHymn, "as selected hymn");
  }, [selectedHymn]);

  const mapped = returnedHymn.map((item, index) => {
    if (returnedHymn.length === 0) {
      return (
        <TouchableOpacity
          style={styles.nameSuggestBox}
          key={index}
          // className={styles.searchReturn}
        >
          <Text style={styles.suggestText}>"No hymn found for this title"</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.nameSuggestBox}
        onPress={() => select_and_push(item.title, item.id)}
        key={index}
        // className={styles.searchReturn}
      >
        <Text style={styles.suggestText}>{item.title}</Text>
        {/* <Text style={styles.suggestText}>{item.author}</Text> */}
        {/* <Text style={styles.suggestText}>{item.phoneNumber}</Text> */}
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => searchHymn(e)}
          // value={number}
          placeholder="Search Here..."
        />
      </View>
      {mapped}
    </View>
  );
};

export default HymnSelect;

const styles = StyleSheet.create({
  body: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#3464eb",
  },
  top: {
    height: 60,
    width: "100%",
    //   backgroundColor: 'green'
  },
  input: {
    height: 40,
    width: "60%",
    marginLeft: "20%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "2%",
  },
  nameSuggestBox: {
    minHeight: 70,
    width: "80%",
    borderColor: "whitesmoke",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  suggestText: {
    color: "whitesmoke",
  },
});
