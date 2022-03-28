import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import CheckBox from "@react-native-community/checkbox";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const EachContacts = ({
  item,
  index,
  setSelectedContacts,
  selecedContacts,
  selectAll
  // toggleCheckBox,
  // setToggleCheckBox,
  // onChangeValue,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = async(newValue) => {
    console.log(newValue)
    await setIsSelected(newValue)
    if(newValue == true){
      setSelectedContacts([...selecedContacts, item])
      return;
    }
    const newSelectedContacts = await selecedContacts.filter(contact => {
      if(item != contact){
        return contact
      }
    })
    setSelectedContacts(newSelectedContacts)
  };

  useEffect(() => {
    const unsub = setIsSelected(selectAll);
    return () => {
      unsub
    }
  }, [selectAll])
  

  return (
    <View style={styles.eachContact}>
      <Text>{`${item.firstName} ${item.lastName}`}</Text>
      <CheckBox
        disabled={false}
        value={isSelected}
        onValueChange={(newValue) => handleClick(newValue)}
      />
    </View>
  );
};

export default EachContacts;

const styles = StyleSheet.create({
  eachContact: {
    flex:1,
    height: "auto",
    width: "100%",
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10
    // backgroundColor: "white",
  },
});
