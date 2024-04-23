import { SetStateAction, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import Ionicons from "react-native-ionicons";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS == "ios" ? 90 : 0;
  const { bottom } = useSafeAreaInsets();
  const openLink = () => {
    Linking.openURL("https://github.com/engbaro/Tabeeb");
  };
  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 2000);
  };

  const trySignIn = async () => {};

  function handleInputValue(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{ fontSize: 10, padding: 10 }}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          Tabeeb will need to verify your account. Carrier charges may apply
        </Text>
        {/* <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Germany</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+05 your phone number"
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked); // you can use the unmasked value as well
            }}
            mask={[
              "(",
              /\d/,
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
        </View> */}
        <View style={{ width: "100%", flex: 1, padding: 24 }}>
          <PhoneInput
            value={phoneNumber}
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            placeholder="Enter your phone number"
          />
          <Text style={styles.legal}>
            You must be{" "}
            <Text style={styles.link} onPress={openLink}>
              at least 16 years old
            </Text>{" "}
            to register. Learn how Tabeeb works to{" "}
            <Text style={styles.link} onPress={openLink}>
              verifiy your credentials
            </Text>
            to ensure you are a liecense practioner.
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber != "" ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          onPress={sendOTP}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber != "" ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 10,
    color: Colors.primary,
  },
  separator: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.3,
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
    marginTop: 10,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  buttonText: {
    color: Colors.lightgray,
    fontSize: 22,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Page;
