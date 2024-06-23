import React from 'react';
import Period from '../../Components/AppointmentPeriod';
import Cards from '../../Components/AppointmentCard';
import {
    View,
  } from "react-native";


export default function Appointments() {
    return (
        <View style={{ flex: 1 }}>
            <Period/>
            <Cards/>
        </View>
    )
};