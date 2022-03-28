import { StyleSheet} from 'react-native'
import React from 'react'
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicking = ({testID, date, mode, is24Hour, display, onChange}) => {
  // console.log("re-rendering-date......")
  return (
    <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={is24Hour}
                display={display}
                onChange={onChange}
              /> 
  )
}

export default React.memo(DatePicking)

const styles = StyleSheet.create({})