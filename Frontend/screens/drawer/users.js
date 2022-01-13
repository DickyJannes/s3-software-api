import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../components/context";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import globalStyles from "../../shared/globalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Task (props){
    const [role, setRole] = useState(0);
    useEffect(() => {
        async function getRole () {
            await AsyncStorage.getItem('role').then(res => setRole(res));
        } 
        getRole();
    }, [])
    return (
        <View style={styles.container}>
            {role >= 99 && 
            <TouchableOpacity onPress={() => props.navigation.navigation.navigate('users')} style={styles.button}>
                <FontAwesomeIcon icon={faUsers} size={30} color="white"/>
                <Text style={globalStyles.drawerButton}>Gebruikers</Text>
            </TouchableOpacity>}
		</View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: '23.5%', 
        position: 'fixed', 
        backgroundColor: '#5A0E56',
        width: '100%', 
        height: '5.5%'
    },
    button: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderColor: "white"
    }
})