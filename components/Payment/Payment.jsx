import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  LogBox,
  Alert,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import PaystackWebView from "react-native-paystack-webview";
import { Paystack, paystackProps } from "react-native-paystack-webview";

const Payment = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.useTheReducer);
  const [paymentReason, setPaymentReason] = useState("");
  const [amount, setAmount] = useState();
  const [btnText, setBtnText] = useState("Pay Now")
  const paystackWebViewRef = useRef();
  const [proceed, setProceed] = useState(false)

  const handleClickPay = async(e) => {
      e.preventDefault();
      console.log(''+Math.floor((Math.random() * 1000000000) + 1), "as refnum")
      paystackWebViewRef.current.startTransaction();
  }

  useEffect(() => {
    if(amount && paymentReason && userDetails.emailAddress && userDetails.phoneNumber && userDetails.lastName && userDetails.firstName){
      setProceed(true)
    } else{
      setProceed(false);
    }
    // console.log(userDetails)
    // return () => {
    //   second;
    // };
  }, [amount, paymentReason]);
  

  return (
    <View style={styles.body}>
      <Text style={styles.info}>
        Welcome {userDetails?.firstName} {userDetails?.lastName}, fill options
        below to make payment.
      </Text>
      <View style={styles.pickerView}>
        <Picker
          style={styles.picks}
          selectedValue={paymentReason}
          onValueChange={(itemValue, itemIndex) => setPaymentReason(itemValue)}
        >
          <Picker.Item label="Payment Reason" value="" />
          <Picker.Item label="BTTS" value="btts" />
          <Picker.Item label="Offerings" value="offerings" />
          <Picker.Item label="Tithe" value="tithe" />
          <Picker.Item label="Seed" value="seed" />
        </Picker>
      </View>

      <TextInput
            onChangeText={(e) => setAmount(e)}
            style={styles.input}
            keyboardType='numeric'
            underlineColorAndroid='transparent'
            placeholder="Amount To Pay"
          />

      {/* <PaystackWebView  
        paystackKey="your-public-key-here"
        paystackSecretKey="your-secret-key-here"
        buttonText="Pay Now"
        showPayButton={true}
        amount={'25000.00'}
        billingEmail="paystackwebview@something.com"
        billingMobile="090990838039"
        billingName="Collins Kelvin"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={false}
      /> */}

      <Paystack
        paystackKey="pk_test_4fd31dc55a11656e06bea61e6952d8ccbf2e9a93"
        billingEmail={`${userDetails?.emailAddress}`}
        billingMobile={`${userDetails?.phoneNumber}`}
        billingName={`${userDetails?.firstName} ${userDetails?.lastName}`}
        amount={`${amount}.00`}
        onCancel={(e) => {
          // handle response here
          console.log("Canceled");
        }}
        onSuccess={(res) => {
          // handle response here
          console.log(res);
        }}
        ref={paystackWebViewRef}
        refNumber={''+Math.floor((Math.random() * 1000000000) + 1)}
      />

     {proceed &&  <TouchableOpacity
      style={styles.btn}
        onPress={handleClickPay}
      >
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#3464eb",
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    width: "70%",
    height: 50,
    marginTop: 50,
    paddingLeft: 10,
    borderRadius: 10,
  },
  info: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  pickerView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    // alignItems: 'center'
  },
  picks: {
    textAlign: "center",
    fontSize: 17,
    color: "black",
  },
  btn: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "70%",
    height: 40,
    justifyContent: "center",
    marginTop: 40,
    alignItems: "center",
  },
  btnText: {
    fontSize: 17,
    color: "black",
  },
});
