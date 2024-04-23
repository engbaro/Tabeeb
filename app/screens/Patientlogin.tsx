import { Text, TextInput, View, StyleSheet, Image , Button} from "react-native";
import Colors from "@/constants/Colors";
import { useState } from "react";
import patient from '@/assets/images/patient.png'

import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
const Patientlogin = ({navigation}) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const patient_uri = Image.resolveAssetSource(patient).uri;
  const insets = useSafeAreaInsets();


  return (
    <View style={{ ...styles.container, paddingTop: insets.top, paddingLeft:insets.left,paddingRight:insets.right, paddingBottom:insets.bottom}}>
      <Image source={{ uri: patient_uri }} style={styles.image} />
      <TextInput
        placeholder="email"
        onChangeText={(text) => onChangeEmail(text)}
        value={email}
        style={styles.email}
      ></TextInput>
      <TextInput value={password} onChangeText={(text) => onChangePassword(text)} secureTextEntry={true} placeholder="password" style={styles.password}></TextInput>
      <Button title="Login as a doctor" onPress={() => navigation.navigate("screens/Doctorlogin")}>Login as a patient</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: 50,
    objectFit:"scale-down"
  },
  email: {
    fontSize: 25,
    
  },
  password: {
    fontSize:25,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Patientlogin;
