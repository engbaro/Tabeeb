import React from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors';
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from "react-native-safe-area-context";


const MainView = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{...styles.container, paddingTop:insets.top}}>
            <Text>MainView</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: Colors.background,
      gap: 20,
    },
    field: {
      borderRadius: 10,
      borderColor: Colors.gray,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: Colors.gray,
      color: "#fff",
      width: "40%",
      textAlign: "center",
    },
  });
export default MainView;