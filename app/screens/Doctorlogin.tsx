import { View, Text, TextInput, Image, StyleSheet, Button } from "react-native";
import stethoscope from "@/assets/images/stethoscope.png";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhoneInput from "react-native-international-phone-number";

const Doctorlogin = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const stethoscope_uri = Image.resolveAssetSource(stethoscope).uri;
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
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
      <PhoneInput
        value={phoneNumber}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        placeholder="Enter your phone number"
        style={styles.phoneinput}
      />
      <TextInput
        value={password}
        onChangeText={(text) => onChangePassword(text)}
        secureTextEntry={true}
        placeholder="password"
        style={styles.password}
      ></TextInput>
      <Button
        title="Login as a patient"
        onPress={() => navigation.navigate("screens/Patientlogin")}
      >
        Login as a patient
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
