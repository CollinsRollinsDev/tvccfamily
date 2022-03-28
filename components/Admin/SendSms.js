import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Contacts from "expo-contacts";
import CheckBox from "@react-native-community/checkbox";
import EachContacts from "./EachContacts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import RNBounceable from "@freakycoder/react-native-bounceable";

const SendSms = ({ navigation }) => {
  let ref = useRef();
  let bouncyCheckboxRef = null
  const [myContacts, setMyContacts] = useState([]);
  const [selecedContacts, setSelectedContacts] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState();
  const [loading, setLoading] = useState(true)
  const [checkboxState, setCheckboxState] = useState(false);
  const [disableState, setDisableState] = useState(false);
  const [selectAll, setSelectAll] = useState(false)

  const askPermission = async() => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.PHONE_NUMBERS, Contacts.Fields],
      });

      if (data.length > 0) {
        const contact = data;
        setMyContacts((prevState) => (prevState = data));
        // console.log(contact);
      }
    }
  }

  useEffect(() => {
    const unsub = askPermission();

    return () => {
      unsub
    }

  }, []);

  const handleSelected = () => {
    console.log(selecedContacts, "as selected contacts");
  };

  const handleCheck = async(isChecked, item) => {
    // if(isChecked)
    console.log(item, "as checked");
  };


  
  const mappedData = myContacts.map((item, index) => {
    loading && setLoading(false)
    return (
      <View style={styles.eachContact} key={item.id}>
        {
          item.phoneNumbers ?  <EachContacts item={item} index={index} setSelectedContacts={setSelectedContacts} selecedContacts={selecedContacts} selectAll={selectAll} /> : null
        }
        {/* {
          item.phoneNumbers ? <BouncyCheckbox
          size={35}
          ref={(ref) => (bouncyCheckboxRef = ref)}
          fillColor="white"
          unfillColor="#3464eb"
          text={`
          Name: ${item.firstName ? item.firstName : ''} ${item.lastName ? item.lastName : ''}
          Phone Number: ${item?.phoneNumbers.length > 0 ? item?.phoneNumbers[0].number : 'none'}
          `}
          iconStyle={{ borderColor: "white" }}
          textStyle={{color:'white'}}
          // disableBuiltInState={false}
          // isChecked={false}
           onPress={(isChecked) => {
             handleCheck(isChecked, item);
           }}
         /> : null
        } */}
     
      </View>
    );
  })
  
  const handleSelectAll = async() => {
    selectAll ? setSelectAll(false) : setSelectAll(true)
  }
  return (
    <View style={styles.body}>
      <Text style={styles.heading1}>
        Select contacts below to send message to them.
      </Text>
      <SafeAreaView>
        <ScrollView>
          {mappedData}
        </ScrollView>
        <View>
          <TouchableOpacity onPress={handleSelectAll}>
            {
              loading ? <Text>Loading Contacts...</Text> : <Text>Test For Selected Item</Text>
            }
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SendSms;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    // alignItems: "center",
    backgroundColor: "#3464eb",
    // minHeight: "100%",
    paddingBottom: 150,
    // paddingTop: 40,
    // width:"100%",
  },
  heading1: {
    fontSize: 17,
    paddingBottom: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  checkItem: {
    width: 30,
    height: 30,
  },
  eachContact: {
    height: "auto",
    width: "100%",
    borderTopWidth:1,
    borderColor:'white'
    // backgroundColor: "white",
  },
  grid: {
    // flex1:1,
    padding: 0,
    // height:'auto',
    // width:'100%',
  },
});
