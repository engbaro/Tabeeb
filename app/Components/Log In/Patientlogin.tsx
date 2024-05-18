import { Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import Colors from "@/app/constants/Colors";
import { useState } from "react";
import patient from "@/app/assets/images/patient.png";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PhoneInput from "react-native-international-phone-number";
import React from "react";
import App from "../../Services/AWS/awsmanager";

const Patientlogin = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const patient_uri = Image.resolveAssetSource(patient).uri;
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  function logIn() {
    // AWS function to send network request
    navigation.navigate("Components/Main/MainView");
  }
  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom,
      }}
    >
      <Image source={{ uri: patient_uri }} style={styles.image} />
      <View style={{ maxWidth: "85%" }}>
        <PhoneInput
          value={phoneNumber}
          onChangePhoneNumber={handleInputValue}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={handleSelectedCountry}
          placeholder="Enter your phone number"
        />
      </View>
      <TextInput
        value={password}
        onChangeText={(text) => onChangePassword(text)}
        secureTextEntry={true}
        placeholder="password"
        style={styles.password}
      ></TextInput>
      <Button title="Log In" onPress={logIn}></Button>
      <Button
        title="Login as a doctor"
        onPress={() => navigation.navigate("Log In/Doctorlogin")}
      >
        Login as a patient
      </Button>
      <Button
        title="Sign Up"
        onPress={() => navigation.push("Components/Sign Up/Patientsignup")}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: 50,
    objectFit: "scale-down",
  },
  email: {
    fontSize: 25,
  },
  password: {
    fontSize: 25,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Patientlogin;
