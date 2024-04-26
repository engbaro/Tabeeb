import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "@/constants/Colors";
import Doctorlogin from "./screens/Log In/Doctorlogin";
import Patientlogin from "./screens/Log In/Patientlogin";
import Doctorsignup from './screens/Sign Up/Doctorsignup';
import Patientsignup from './screens/Sign Up/Patientsignup';
import MainView from './screens/Main/MainView'
import React from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="screens/Log In/Patientlogin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="screens/Log In/Patientlogin"
        component={Patientlogin}
      />
      <Stack.Screen name="screens/Log In/Doctorlogin" component={Doctorlogin} />
      <Stack.Screen
        name="screens/Sign Up/Doctorsignup"
        component={Doctorsignup}
      />
      <Stack.Screen name="screens/Sign Up/Patientsignup" component={Patientsignup}></Stack.Screen>
      <Stack.Screen name ="screens/Main/MainView" component={MainView} />
    </Stack.Navigator>
  );
}

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
