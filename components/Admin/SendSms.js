import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Contacts from "expo-contacts";
import EachContacts from "./EachContacts";

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
  const [selectStatement, setSelectStatement] = useState("Select All")

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
      </View>
    );
  })
  
  const handleSelectAll = async() => {
    selectAll ? setSelectAll(false) : setSelectAll(true)
    !selectAll ? setSelectStatement("Unselect All") : setSelectStatement("Select All")
    if(!selectAll){
      setSelectedContacts(myContacts)
      return;
    }
    setSelectedContacts([])
  }

  const proceedToConfirmSms = () => {
    navigation.navigate('ConfirmSendSms', {
      selectedPeople: selecedContacts,
      // otherParam: 'anything you want here',
    });
  }

  const belowHandler = <View style={styles.belowHandle}>
     <TouchableOpacity onPress={handleSelectAll} style={styles.btn1}>
       <Text style={styles.btn1Text}>
         {selectStatement}
       </Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={proceedToConfirmSms} style={styles.btn1}>
       <Text style={styles.btn1Text}>
         Proceed
       </Text>
     </TouchableOpacity>
  </View>
  

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
          {
            loading ? <Image
            style={styles.stretch}
            source={require("../../assets/loading1.gif")}
          /> :
          belowHandler
          }
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
  stretch:{
    height:30,
    width:30
  },
  belowHandle:{
    height: 70,
    width: "100%",
    // backgroundColor:'red',
    // flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  btn1:{
    height:40,
    width:'auto',
    padding:2,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'white',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  btn1Text:{
    color:'#3464eb',
    fontWeight:'700'
  }

});
