import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { bounce } from 'react-native/Libraries/Animated/src/Easing';
import globalStyles from '../shared/globalStyles';
import { apiTaskConnection } from '../shared/globalValues';


var result = [];
export default function Home( ) {

  const [functionButtonText, setFunctionButtonText] = useState("+");
  const [functionExpanded, setFunctionButtonExpanded] = useState(false);

  function toggleFunctionPanel() {

    functionButtonText === "+"
    ? setFunctionButtonText("-")
    : setFunctionButtonText("+");

    functionExpanded === false
    ? setFunctionButtonExpanded(true)
    : setFunctionButtonExpanded(false);
}
    return (
      <View style={globalStyles.container}>
        <StatusBar animated={true} backgroundColor="#000" hidden={false} />
        <View style={styles.task}>
          {GetComponent('C3E077A3-59CF-4E23-AE7E-EEBC357C6DD1')}
        </View>
        <View style={styles.functionPanelDivider}></View>
        <View style={styles.functionPanelContainer}>
          <View style={styles.functionPanel}>
            <Text style={styles.functionPanelText}>Functies</Text>
            <TouchableOpacity style={styles.functionPanelButton} onPress={toggleFunctionPanel}><Text style={styles.functionPanelButtonText}>{functionButtonText}</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function GetComponent(Id) {
    const [taskButtonText, setButtonText] = useState("+");
    const [taskExpanded, setButtonExpanded] = useState(false);
    const [reload, setReload] = useState(0);

    useEffect(() => {
      onload();
  }, [])

    onload = () => {
        GetInfo();
    }
  
    async function GetInfo() {
        let resp = await fetch(apiTaskConnection + Id, {
        crossDomain: true
        });
        result = await resp.json();
        setReload(reload+1);
    }
    function toggleInfoPanel() {
  
        taskButtonText === "+"
            ? setButtonText("-")
            : setButtonText("+");
  
        taskExpanded === false
            ? setButtonExpanded(true)
            : setButtonExpanded(false);
    }
  
    return (
                <View>
                  <Text style={styles.taskText}>Nu beginnen aan:</Text>
                  <View style={styles.taskView}>
                    <Text style={styles.taskTextProp}>{result.name}</Text>
                    <TouchableOpacity onPress={toggleInfoPanel} style={styles.taskTextButton}><Text style={styles.taskTextButton}>{taskButtonText}</Text></TouchableOpacity>
                  </View>
                  <View style={styles.taskDivider}></View>
                  {taskExpanded && (
                  <View style={{width: '100%'}}>
                    <Text style={styles.taskTextExpanded}>Verwachte tijdsduur:</Text>
                    <Text style={styles.taskTextProp}>{result.durationMinutes} minuten</Text>
                    <View style={styles.taskDividerExpanded}></View>
                  </View>
                  )}
                  <TouchableOpacity style={styles.taskButton}><Text style={styles.taskButtonText}>Start</Text></TouchableOpacity>
                </View>
              );
  }

  const styles = StyleSheet.create({
    task: {
      backgroundColor: '#5A0E56'
    },
    taskView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    taskText: {
      marginLeft: '2%',
      color: 'white',
      fontSize: 20
    },
    taskTextButton: {
      marginRight: '2%',
      color: 'white',
      fontSize: 20
    },
    taskTextExpanded: {
      marginLeft: '2%',
      color: 'white',
      fontSize: 18
    },
    taskTextProp: {
      marginLeft: '2%',
      color: '#CEC9C9',
      fontSize: 20
    },
    taskDivider: {
      height: '1%',
      width: '100%',
      backgroundColor: 'white'
    },
    taskDividerExpanded: {
      height: '5%',
      width: '100%',
      backgroundColor: 'white'
    },
    taskButton: {
      marginTop: '3%',
      marginBottom: '3%',
      backgroundColor: 'white',
      width: '50%',
      borderRadius: 100,
      alignItems: 'center',
      alignSelf: 'center'
    },
    taskButtonText: {
      fontSize: 20,
    },
    functionPanelContainer: {
      display: 'flex',
      position: 'absolute',
      top: '90%',
      backgroundColor: 'white',
      height: '10%',
      width: '100%',
      alignItems: 'center',
    },
    functionPanel: {
      display: 'flex',
      height: '100%',
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    functionPanelDivider: {
      position: 'absolute',
      top: '89.8%',
      height: '0.2%',
      width: '100%',
      backgroundColor: 'black'
    },
    functionPanelText: {
      marginLeft: '5%',
      fontSize: 40,
    },
    functionPanelButton: {
      backgroundColor: 'white',
      justifyContent: 'center'
    },
    functionPanelButtonText: {
      fontSize: 40,
      marginLeft: '10%',
      color: 'black',
    }
  });