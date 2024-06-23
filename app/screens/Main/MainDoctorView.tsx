import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";

import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import TabComponent from '../../Components/Tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainView from "./MainView";
import Appointments from "../Doctor/Appointment";
import Calendar from "../Doctor/Calendar";

const Tab = createBottomTabNavigator();
//import Featured from "../components/Featured";
//import Recommendations from "../components/Recommendations";
//import DoctorsList from "../components/DoctorsList";
//import ServicesList from "../components/ServicesList";
//import TestimonialList from "../components/TestimonialList";

export default function MainDocScreen() {
  return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <ImageBackground
          source={require("../../../assets/images/HomeGradientTopBG.jpg")}
          style={styles.topImgBG}
        >
            <Tab.Navigator>
      <Tab.Screen name="Appointments" component={Appointments}    options={{
          tabBarLabel: 'Appointments',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="heartbeat" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Calendar" component={Calendar}    options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="calendar" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={MainView}         options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
        </ImageBackground>

</View>

  )
};

const styles = StyleSheet.create({
  topImgBG: {
    height: "100%",
    width: "100%",
    //overflow: "hidden",
   // borderBottomLeftRadius: 1,
   // borderBottomRightRadius: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    borderRadius: 1,
  },
  blurContainer: {
    elevation: 10,
    // top: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  greetingName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 30,
  },
  TextAndSearchContainer: {
    width: "90%",
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    height: 40,
  },
  greetingSearch: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "right",
  },
  input: {
    marginLeft: 10,
    width: "80%",
  },
  bookButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 20,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  bookButtonText: {
    fontSize: 16,
    color: "#00b894",
    fontWeight: "bold",
  },
  contactInfoContainer: {
    alignItems: "center",
    padding: 10,
  },
  contactButton: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactButtonText: {
    fontSize: 16,
    color: "#00b894",
    marginLeft: 10,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
});

/**
 * 
 * 
 *           <View style={styles.topContainer}>
            <BlurView intensity={20} style={styles.blurContainer}>
              <Text style={styles.greetingName}>Hello, Rajkumar</Text>
              <Image
                source={require("../../../assets/images/avatar.jpg")}
                style={styles.avatar}
              />
            </BlurView>
            <View style={styles.TextAndSearchContainer}>
           
              <View style={styles.contactInfoContainer}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => {
                    // Add the code to initiate a call here
                  }}
                >
                  <FontAwesome5 name="phone" size={20} color="#00b894" />
                  <Text style={styles.contactButtonText}>
                    Call us at: (123) 456-7890
                  </Text>
                </TouchableOpacity>
              </View>
             
              <View style={styles.searchContainer}>
                <EvilIcons name="search" size={24} color="#00b894" />
                <TextInput
                  style={styles.input}
                  placeholder="Find your doctor"
                />
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book an Appointment</Text>
              </TouchableOpacity>
            </View>


          </View>
 */
