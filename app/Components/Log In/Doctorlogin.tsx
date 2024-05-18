import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import stethoscope from "@/app/assets/images/stethoscope.png";
import { useState } from "react";
import Colors from "@/app/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhoneInput from "react-native-international-phone-number";
import React from "react";

const Doctorlogin = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const stethoscope_uri = Image.resolveAssetSource(stethoscope).uri;
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
      }}
    >
      <Image source={{ uri: stethoscope_uri }} style={styles.image} />
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
        title="Login as a patient"
        onPress={() => navigation.navigate("Components/Log In/Patientlogin")}
      >
        Login as a patient
      </Button>

      <Button
        title="Sign Up"
        onPress={() => navigation.push("Components/Sign Up/Doctorsignup")}
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
  phoneinput: {
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
export default Doctorlogin;
