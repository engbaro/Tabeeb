import { Icon, ListItem } from '@rneui/themed';
import React, { useState } from 'react';
import { Icon as ThemedIcon, ListItem as ThemedListItem } from '@rneui/themed';
import axios from 'axios';

    const Period = () => {
        const [isExpanded, setExpanded] = useState(false);
        const list2 = [
            { name: 'Today' },
            { name: 'Tomorrow' },
            { name: 'This week' },
        ];

        const handlePress = async (period: string) => {
            try {
                setExpanded(false)
                const response = await axios.get(`https://your-api.com/appointments?period=${period}`);
                // Handle the response here
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <ListItem.Accordion
            content={
                <>
                  
                  <ListItem.Content>
                    <ListItem.Title>Period</ListItem.Title>
                  </ListItem.Content>
                </>
              }
                isExpanded={isExpanded}
                onPress={() => {
                    setExpanded(!isExpanded);
                }}
            >
                {list2.map((l, i) => (
                    <ListItem
                        key={i}
                        onPress={() => handlePress(l.name)} // Modify this line
                    >
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))}
            </ListItem.Accordion>
        );

    };

export default Period;
