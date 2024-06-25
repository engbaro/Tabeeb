import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Colors from "../../constants/Colors";
import {handleSignOut}  from "../../Services/AWS/awsmanager";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MainView = ({navigation}) => {
  const insets = useSafeAreaInsets(); 
  async function logOut() {
    // AWS function to send network request
    const signInResults = await handleSignOut();
    navigation.goBack()
  }
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text>MainView</Text>
      <Button title="Log Out" onPress={logOut}></Button>
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
export default MainView;
