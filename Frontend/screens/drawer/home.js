import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../components/context";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import globalStyles from "../../shared/globalStyles";

export default function Home(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigation.navigate('Schoonmaak_Planning')} style={styles.button}>
                <FontAwesomeIcon icon={faHome} size={30} color="white"/>
                <Text style={globalStyles.drawerButton}>Hoofdscherm</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        top: '7%', 
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
        borderBottomWidth: 2,
        borderColor: "white"
    }
})