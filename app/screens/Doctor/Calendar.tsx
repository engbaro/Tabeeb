import React from 'react';
import AppointmentCalendar from '../../Components/AppointmentCalendar';
import {
    View,
  } from "react-native";


export default function Calendar() {
    return (
        <View style={{ flex: 1 }}>
            <AppointmentCalendar/>
        </View>
    )
};