import RNPickerSelect from 'react-native-picker-select'
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text , Switch} from "react-native";
import Healthproviders from '@/app/constants/Healthproviders';
const UserTypeForm = ( { getUser } ) => {
    const [category, setCategory] = useState(null);
    const [proffesions, setProfessions] = useState<string[]>([]);
    const [specialization, setSpecialization] = useState("");
    const [user, setUser] = useState({});
    const [userType, setUserType] = useState("Patient");
    useEffect(() => {
        const proffesionTypes = Healthproviders.find(item =>  item.category === category )?.professions
        setProfessions(proffesionTypes ? proffesionTypes : [])
    },[category]);
    useEffect(() => {
        setUser({userType:userType, specialization:specialization, category:category})
    },[userType, specialization, category])
    useEffect(() => {
        getUser(user)
    }, [user]);
    function toggleUserType () {
        setUserType((prevUserType) => (prevUserType === "Medical specialist" ? "Patient" : "Medical specialist"));
    }
    return(
        <View>
        <View>
        <View style={pickerStyles.switchContainer}>
          <Text style={pickerStyles.genderText}>Patient</Text>
          <Switch
            value={userType === "Medical specialist"}
            onValueChange={toggleUserType}
            thumbColor={userType === "Medical specialist" ? "#5EDB84" : "#5EADDB"}
            trackColor={{ false: "#fff", true: "#fff" }}
          />
          <Text style={pickerStyles.genderText}>Medical Professional</Text>
        </View>
        {
          userType === "Medical specialist" ? (
            <>
            <RNPickerSelect 
            onValueChange={(value) => setCategory(value)}
            items={Healthproviders.map(category => ({
              label: category.category,
              value: category.category,
            }))}
            placeholder={{ label: "Select a category", value: null }}
            value={category}
            />
            <RNPickerSelect 
            onValueChange={(value) => setSpecialization(value)}
            items={proffesions.map(item => ({
                label:item,
                value:item,
            }))}
            placeholder={{ label: "Select your specialization", value: null }}
            value={specialization}
            />
            </>
          ) : <></>
        }
      </View>
    </View>
    );
}
const pickerStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    genderText: {
      fontSize: 16,
      marginRight: 10,
    },
    selectedGender: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
    },
  });
export default UserTypeForm