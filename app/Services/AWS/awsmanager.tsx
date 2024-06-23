import React from "react";
import { Button, View, StyleSheet } from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import awsconfig from "../../../src/aws-exports";
import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainDocScreen from "../../screens/Main/MainDoctorView";

Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}
const App = () => {
  const Stack = createStackNavigator();

  return (

      <MainDocScreen/>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // Add your styles here
  },
});

export default App;


