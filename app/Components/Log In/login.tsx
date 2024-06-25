import { Text, TextInput, View, StyleSheet, Image, Button } from "react-native";
import Colors from "@/app/constants/Colors";
import { useState } from "react";
import patient from "@/app/assets/images/patient.png";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PhoneInput from "react-native-international-phone-number";
import {handleSignIn}  from "../../Services/AWS/awsmanager";
import React from "react";
import App from "../../Services/AWS/awsmanager";

const Patientlogin = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const patient_uri = Image.resolveAssetSource(patient).uri;
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  async function logIn() {
    // AWS function to send network request
    const signInResults = await handleSignIn({username:email, password:password });
    if (signInResults){
      const {isSignedIn, nextStep} = signInResults;
      if(isSignedIn){
        navigation.push("Components/Main/MainView");
      }
    }
    
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
      <TextInput
        style={styles.field}
        placeholder="email"
        placeholderTextColor={"ivory"}
        value={email}
        onChangeText={onChangeEmail}
      />
      <TextInput
        value={password}
        onChangeText={(text) => onChangePassword(text)}
        secureTextEntry={true}
        placeholder="password"
        style={styles.password}
      ></TextInput>
      <Button title="Log In" onPress={logIn}></Button>
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

export default Patientlogin;
