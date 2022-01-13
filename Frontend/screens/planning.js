import React from 'react';
import { Button, StyleSheet, Text, View, StatusBar } from 'react-native';
import globalStyles from '../shared/globalStyles';

export default function App( ) {
    const pressHandler = () => {
        navigation.navigate('Task');
      }
    
    
      
    return (
      <View style={globalStyles.container}>
        <StatusBar animated={true} backgroundColor="#000" hidden={false} />
        <Text>Hi</Text>
      </View>
    );
  }