import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Picker,
  Switch,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { handleSignUp } from "../../Services/AWS/awsmanager";
import PhoneInput from "react-native-international-phone-number";
import { SignUpParemeters } from "../../models/patient";
import {
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import DatePicker from "react-native-modern-datepicker";
import AddressForm from "./Address";

const Patientsignup = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Female");
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(`${new Date()}`);
  const updateFullAddress = (concatenatedProps) => {
    setAddress(concatenatedProps);
    console.log(address);
  };
  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country.name.en);
  }
  function signUpSubmit() {
    // AWS function to send network request
    const signUpData: SignUpParemeters = {
      username: email,
      email: email,
      phone_number: phoneNumber,
      address: `${selectedCountry}`,
      firstname: firstname,
      lastname: lastname,
      paymentmethod: "credit_card",
      gender: gender,
      creditcard: "1234 5678 9012 3456",
      birthyear: `${date}`,
      password: password,
    };
    handleSignUp();
    navigation.navigate("Components/Main/MainView");
  }
  function handleOnPress() {
    setOpen(!open);
  }
  function handleChange(propDate) {
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
      <AddressForm updateFullAddress={updateFullAddress} />
      <View style={{ maxWidth: "85%" }}>
        <PhoneInput
          value={phoneNumber}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          placeholder="Enter your phone number"
        />
      </View>
      <TouchableOpacity onPress={handleOnPress}>
        <Text>Select Date</Text>
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
        <Text style={genderPickerStyles.label}>Select Gender:</Text>
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
    gap: 20,
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
