import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Link, Redirect, Stack } from "expo-router";
import Colors from "@/app/constants/Colors";
import hands from "@/app/assets/images/hands.png";
import Doctorlogin from "./Log In/Doctorlogin";
import Patientlogin from "./Log In/Patientlogin";
import MainView from "./Main/MainView";
import Doctorsignup from "./Sign Up/Doctorsignup";
import Patientsignup from "./Sign Up/Patientsignup";
const hands_image = Image.resolveAssetSource(hands).uri;
const App = () => {
  const openLink = () => {
    Linking.openURL("https://github.com/engbaro/Tabeeb");
  };
  return (
    <>
      <Text>Index View</Text>
    </>
    // <Stack.Navigator
    //   initialRouteName="screens/Log In/Patientlogin"
    //   screenOptions={{ headerShown: false }}
    // >
    //   <Stack.Screen
    //     name="screens/Log In/Patientlogin"
    //     component={Patientlogin}
    //   />
    //   <Stack.Screen name="screens/Log In/Doctorlogin" component={Doctorlogin} />
    //   <Stack.Screen
    //     name="screens/Sign Up/Doctorsignup"
    //     component={Doctorsignup}
    //   />
    //   <Stack.Screen
    //     name="screens/Sign Up/Patientsignup"
    //     component={Patientsignup}
    //   ></Stack.Screen>
    //   <Stack.Screen name="screens/Main/MainView" component={MainView} />
    // </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcome: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    borderRadius: 80,
    borderWidth: 0.5,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
export default App;
