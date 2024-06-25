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
  ScrollView,
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
import Utils from '@/app/Utilities/Utility'
import UserTypeForm from "./UserType";

const Patientsignup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Female");
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(`${new Date()}`);
  const [doctorStatus, setDoctorStatus] = useState("un-verified");

  const updateFullAddress = (concatenatedProps) => {
    setAddress(concatenatedProps);
  };
  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  };
  const getUser = (user) => {
    setUser(user);
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
      locale:address.substring(address.lastIndexOf(' ') + 1),
      specialization:user["specialization"],
      category:user["category"],
      doctorl_status:"un-verified",
      role:user["userType"]
    };
    const signUpResult = await handleSignUp(signUpData);
    if (signUpResult) {
      const { isSignUpComplete, userId, nextStep } = signUpResult;
      console.log("Sign Up complete status:", isSignUpComplete, "for ", signUpData)
      navigation.navigate("Components/Main/MainView");
    } else {
      // Handle sign-up failure (optional)
      console.log('Sign-up failed');
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
    <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: insets.top + 70 }}>
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
      <UserTypeForm getUser={getUser} />
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
      <View>
        <View style={pickerStyles.switchContainer}>
          <Text style={pickerStyles.genderText}>Female</Text>
          <Switch
            value={gender === "Male"}
            onValueChange={toggleGender}
            thumbColor={gender === "Male" ? "#87CEEB" : "#FFB6C1"}
            trackColor={{ false: "#fff", true: "#fff" }}
          />
          <Text style={pickerStyles.genderText}>Male</Text>
        </View>
      </View>
      <Button title="Sign Up" onPress={signUpSubmit} />
      <Button title="Log In" onPress={() => navigation.goBack()} />
    </ScrollView>
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
    paddingBottom: 10,
    backgroundColor: Colors.gray,
    color: "#fff",
    width: "40%",
    textAlign: "center",
  },
});
const pickerStyles = StyleSheet.create({
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
