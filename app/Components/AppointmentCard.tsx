import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import axios from 'axios';


type CardsComponentsProps = {};
type Appointment = {
    appointmentId: number;
    patientName: string;
    scheduleDate: string;
    scheduleTime: string;
    reasonToVisit: string;
    isPhotoUploaded?: boolean;
};

const Cards: React.FunctionComponent<CardsComponentsProps> = () => {
let [appointments, setAppointments] = useState<Appointment[]>([]);
useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = {
            data : [{
                appointmentId: 1,
                patientName: 'john',
                scheduleDate: '2021-09-01',
                scheduleTime: '10:00',
                reasonToVisit: 'fever',
                isPhotoUploaded: false,
            },
            {
                appointmentId: 2,
                patientName: 'john',
                scheduleDate: '2021-09-01',
                scheduleTime: '10:00',
                reasonToVisit: 'fever',
                isPhotoUploaded: true,
            },
            {
                appointmentId: 3,
                patientName: 'john',
                scheduleDate: '2021-09-01',
                scheduleTime: '10:00',
                reasonToVisit: 'fever',
                isPhotoUploaded: true,
            }
            ]
        }
        setAppointments(response.data);//await axios.get('localhost:3000/api/v1/appointment?period');
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointments();
  }, []); 
return (
    <ScrollView>
        <View>
      {appointments.length > 0 ? (appointments.map((appointment, index) => (
        <Card key={appointment.appointmentId}>
          <Card.Title>{appointment.scheduleTime}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>
              Patient Name: {appointment.patientName}
            </Text>
            <Text style={{ marginBottom: 10 }} numberOfLines={1}>
              Reason: {appointment.reasonToVisit}
            </Text>
            <View style = {styles.buttonContainer}>
            <Button style = {styles.buttonStyle}
            icon={
              <Icon
                name="call"
                color="#ffffff"
               
              />
            }    
          />
           <Button style = {styles.buttonStyle} disabled={!appointment.isPhotoUploaded}
            icon={
              <Icon
                name="photo"
                color="#ffffff"
              />
            }
          />
            </View>
        </Card>)) ) : ( <Text style={{ textAlign: 'center', marginTop: '50%' }}>No appointments found</Text>
      )}
      </View>
    </ScrollView>
);
};

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 0,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
      },
container: {
  flex: 1,
},
fonts: {
  marginBottom: 8,
},
user: {
  flexDirection: 'row',
  marginBottom: 6,
},
image: {
  width: 30,
  height: 30,
  marginRight: 10,
},
name: {
  fontSize: 16,
  marginTop: 5,
},
});

export default Cards;