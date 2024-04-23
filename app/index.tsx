import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Link, Redirect } from "expo-router";
import Colors from "@/constants/Colors";
import hands from "@/assets/images/hands.png";
const hands_image = Image.resolveAssetSource(hands).uri;
const Page = () => {
  const openLink = () => {
    Linking.openURL("https://github.com/engbaro/Tabeeb");
  };
  return (<></>
    // <Redirect href="/screens/patientlogin"/>
    // <View style={styles.container}>
    //   <Image source={{ uri: hands_image }} style={styles.welcome} />
    //   <Text style={styles.headline}>Welcome to Tabeeb</Text>
    //   <Text style={styles.description}>
    //     Once you are verified you will{" "}
    //     <Text style={styles.link} onPress={openLink}>
    //       gain access
    //     </Text>
    //     <Link href={"/otp"} asChild>
    //     <TouchableOpacity style={styles.button}>
    //       <Text style={styles.buttonText}>
    //       {' '}as a medical practioner
    //       </Text>
    //     </TouchableOpacity>
    //   </Link>
    //   </Text>
    // </View>
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
export default Page;
