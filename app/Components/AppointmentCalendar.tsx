import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

type State = {
    selectedStartDate: Date | null;
};

const AppointmentCalendar = () =>{
    const [startDate, setSelectedStartDate] = useState<Date | null>(null);
    const [customDatesStyles, setCustomDatesStyles] = useState<{ date: Date; style: any; textStyle: any }[]>([]);
    let formattedStartDate:string;


    function onDateChange(date: Date) {
        setSelectedStartDate(date);
         formattedStartDate = startDate ? startDate.toString() : "";
    }

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const schedules = [
                        {
                            date: '2024-06-24',
                            filled: false,
                            start: "10:15",
                            end: "12:00",
                            availableSlots:["10:15" ],
                            takenSlots: ["10:30"],
                            interval:15
                        },
                        {
                            date: '2024-06-20',
                            filled: true,
                            availableSlots:[],
                            takenSlots: ["10:15", "10:30", "10:15", "10:30"],
                            interval:15
                        }
                    ];    //await fetchSchedules();

                    const newMarkedDates: { date: Date; style: any; textStyle: any }[] = [];
                    schedules.forEach((schedule: any) => {
                        const totalSpots = schedule.availableSlots.length + schedule.takenSlots.length;
                        const filledPercentage = (schedule.takenSlots.length / totalSpots) * 100;
                        console.log('inside for each loop');
                        let business;
                        if (filledPercentage < 30) {
                            business = '#ADD8E6'; // light blue
                          } else if (filledPercentage < 70) {
                            business = '#4169E1'; // medium blue
                          } else {
                            business = '#00008B'; // dark blue
                          }
                        let date:Date = new Date(schedule.date);
                        date.setHours(1);
                        newMarkedDates.push({
                            date: date,
                            style: { backgroundColor: business },
                            textStyle: { color: 'white' },
                        });
                    });
                    setCustomDatesStyles(newMarkedDates);
                    console.log(newMarkedDates)
                } catch (error) {
                    console.error('Error fetching schedules:', error);
                }
            };

            fetchData();
        }, []);

        return (
            <View style={styles.container}>
                <CalendarPicker onDateChange={onDateChange} 
             customDatesStyles={customDatesStyles}
                />
                <View>
                    <Text>SELECTED DATE: {startDate?.toString()}</Text>
                </View>
            </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
});

function fetchSchedules() {
    throw new Error("Function not implemented.");
}

export default AppointmentCalendar;
