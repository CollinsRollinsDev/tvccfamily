import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
// import CheckBox from "@react-native-community/checkbox";
import Checkbox from 'expo-checkbox';

const EachContacts = ({
  item,
  index,
  setSelectedContacts,
  selecedContacts,
  selectAll,
  // toggleCheckBox,
  // setToggleCheckBox,
  // onChangeValue,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = async (newValue) => {
    console.log(newValue);
    await setIsSelected(newValue);
    if (newValue == true) {
      setSelectedContacts([...selecedContacts, item]);
      return;
    }
    const newSelectedContacts = await selecedContacts.filter((contact) => {
      if (item != contact) {
        return contact;
      }
    });
    setSelectedContacts(newSelectedContacts);
  };

  useEffect(() => {
    const unsub = setIsSelected(selectAll);
    return () => {
      unsub;
    };
  }, [selectAll]);

  return (
    <View style={styles.eachContact}>
      <Text style={styles.listContact}>{`${item.firstName} ${
        item.lastName != undefined ? item.lastName : ""
      }`}</Text>
      {/* <CheckBox
        disabled={false}
        value={isSelected}
        onValueChange={(newValue) => handleClick(newValue)}
      /> */}
      <Checkbox
          // style={styles.checkbox}
          value={isSelected}
          onValueChange={(newValue) => handleClick(newValue)}
          color={isSelected ? '#4630EB' : undefined}
        />
    </View>
  );
};

export default EachContacts;

const styles = StyleSheet.create({
  eachContact: {
    flex: 1,
    height: "auto",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "white",
  },
  listContact:{
    color:'white',
    fontSize:18,
    fontWeight:'600'
  }
});
