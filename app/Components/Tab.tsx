import React from 'react';
import { Tab, Text, TabView } from '@rneui/themed';

export default function TabComponent() {
const [index, setIndex] = React.useState(0);

return (
  <>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'white',
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="appointments"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'heartbeat', type: 'font-awesome', color: 'white' }}
      />
      <Tab.Item
        title="calendar"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'calendar', type: 'ionicon', color: 'white' }}
      />
      <Tab.Item
        title="profile"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
      />
    </Tab>

    <TabView value={index} onChange={setIndex} animationType="spring">
      <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
        <Text h1>Appointment</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
        <Text h1>Day schedule</Text>
      </TabView.Item>
      <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
        <Text h1>Profile</Text>
      </TabView.Item>
    </TabView>
  </>
);
};