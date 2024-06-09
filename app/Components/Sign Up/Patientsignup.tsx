import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {handleSignUp, handleSignUpConfirmation}  from "../../Services/AWS/awsmanager";
import PhoneInput from "react-native-international-phone-number";
import { SignUpParemeters } from "../../models/patient";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import DatePicker from "react-native-modern-datepicker";
import AddressForm from "./Address";
import { signIn } from "aws-amplify/auth";
import Utils from '@/app/Utilities/Utility'

const Patientsignup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Female");
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(`${new Date()}`);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const updateFullAddress = (concatenatedProps) => {
    setAddress(concatenatedProps);
  };
  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }

  async function signUpSubmit() {
    // AWS function to send network request
    const signUpData: SignUpParemeters = {
      username: email,
      email: email,
      phone_number: Utils.formatPhoneNumber(phoneNumber, Utils.getFirstPartBeforeSpace(address)),
      address: address,
      firstname: firstname,
      lastname: lastname,
      paymentmethod: "credit_card",
      gender: gender,
      creditcard: "1234 5678 9012 3456",
      birthyear: convertDateFormat(date),
      password: password,
      locale:address.substring(address.lastIndexOf(' ') + 1)
    };
    const signUpResult = await handleSignUp(signUpData);
    if (signUpResult) {
      const { isSignUpComplete, userId, nextStep } = signUpResult;
      console.log("Sign Up complete status:", isSignUpComplete)
      if (!isSignUpComplete && nextStep) {
        setOpenConfirm(true);
      }
      // else if (isSignUpComplete) {
      //   navigation.navigate("Components/Main/MainView");
      // } else {
      //   console.log("Next step:", nextStep);
      //   // navigation.navigate('VerificationScreen', { userId });
      // }
    } else {
      // Handle sign-up failure (optional)
      console.log('Sign-up failed');
    }
    
  }
  async function confirmSignUp(){
    const username = email;
    const confirmationResult = await handleSignUpConfirmation({ username, confirmationCode })
    if (!confirmationResult?.isSignUpComplete && confirmationResult?.nextStep){
      // continue authentication
    }else{
      setOpenConfirm(false)
      navigation.navigate("Components/Main/MainView");
    }
  }
  function convertDateFormat(dateString) {
    // Regular expression patterns for both date formats
    const slashDatePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    const longDatePattern = /^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[-+]\d{4}$/;
  
    if (slashDatePattern.test(dateString)) {
      // Format YYYY/MM/DD
      return dateString.replace(/\//g, '-');
    } else if (longDatePattern.test(dateString)) {
      // Format Tue May 21 2024 23:33:01 GMT-0700
      const parsedDate = new Date(dateString);
  
      // Check if the parsed date is valid
      if (isNaN(parsedDate)) {
        console.log("Date in question", dateString);
        throw new Error("Invalid date format.");
      }
  
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(parsedDate.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
    } else {
      console.log("Date in question", dateString);
      throw new Error("Invalid date format. Expected format is YYYY/MM/DD or a valid date string like 'Tue May 21 2024 23:33:01 GMT-0700'.");
    }
  }
  
  function handleOnPress() {
    setOpen(!open);
  }
  function handleChange(propDate: any) {
    setDate(propDate);
    console.log(propDate);
  }
  const toggleGender = () => {
    setGender((prevGender) => (prevGender === "Male" ? "Female" : "Male"));
  };
  return (
    <View style={{ ...styles.container, paddingTop: insets.top + 70 }}>
      <Text style={{ fontWeight: "bold", fontSize: 32 }}>Sign Up</Text>
      <TextInput
        style={styles.field}
        placeholder="first name"
        placeholderTextColor={"ivory"}
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.field}
        placeholder="last name"
        placeholderTextColor={"ivory"}
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.field}
        placeholder="email"
        placeholderTextColor={"ivory"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.field}
        placeholder="password"
        placeholderTextColor={"ivory"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{
          ...styles.field,
          fontSize: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}
        placeholder="confirm password"
        placeholderTextColor={"ivory"}
        secureTextEntry
      />
      <TextInput
      style={styles.field}
      value={phoneNumber}
      placeholder="Phone number"
      placeholderTextColor={"ivory"}
      onChangeText={handleInputValue}
      keyboardType="phone-pad"
      maxLength={11}
      />
      <AddressForm updateFullAddress={updateFullAddress} />
      
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Set Birthday : {date.substring(3,15)}</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={dateStyles.centeredView}>
          <View style={dateStyles.modalView}>
            <DatePicker
              mode="calendar"
              selected={date}
              onDateChange={handleChange}

            />
            <TouchableOpacity onPress={handleOnPress}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={openConfirm}>
        <View style={dateStyles.centeredView}>
          <View style={dateStyles.modalView}>
            <TextInput style={styles.field} placeholder="Confirmation code" value={confirmationCode} onChangeText={setConfirmationCode}></TextInput>
            <TouchableOpacity onPress={handleOnPress}>
              <Text onPress={confirmSignUp}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>
        <View style={genderPickerStyles.switchContainer}>
          <Text style={genderPickerStyles.genderText}>Female</Text>
          <Switch
            value={gender === "Male"}
            onValueChange={toggleGender}
            thumbColor={gender === "Male" ? "#87CEEB" : "#FFB6C1"}
            trackColor={{ false: "#fff", true: "#fff" }}
          />
          <Text style={genderPickerStyles.genderText}>Male</Text>
        </View>
      </View>
      <Button title="Sign Up" onPress={signUpSubmit} />
      <Button title="Log In" onPress={() => navigation.goBack()} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: 15,
  },
  field: {
    borderRadius: 10,
    borderColor: Colors.gray,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.gray,
    color: "#fff",
    width: "40%",
    textAlign: "center",
  },
});
const genderPickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  genderText: {
    fontSize: 16,
    marginRight: 10,
  },
  selectedGender: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
const dateStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const isValidEmail = (email: string) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export default Patientsignup;
