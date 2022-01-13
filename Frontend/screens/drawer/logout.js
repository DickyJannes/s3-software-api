import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../components/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import globalStyles from "../../shared/globalStyles";

export default function Logout (){
    const { signOut } = useContext(AuthContext);

    async function logOut() {
        var userName = await AsyncStorage.getItem('userName');
        var verification = await AsyncStorage.getItem('verification');
        signOut(await userName, await verification);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => logOut()} style={styles.button}>
                <FontAwesomeIcon icon={faUserAltSlash} size={30} color="white"/>
                <Text style={globalStyles.drawerButton}>Log uit</Text>
            </TouchableOpacity>
		</View>

    )
}

const styles = StyleSheet.create({
    container: {
        bottom: 0, 
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
        borderTopWidth: 2,
        borderColor: "white"
    }
})