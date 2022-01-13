import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../components/context";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import globalStyles from "../../shared/globalStyles";

export default function Planning (props){
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigation.navigate('planning')} style={styles.button}>
                <FontAwesomeIcon icon={faCalendarAlt} size={30} color="white"/>
                <Text style={globalStyles.drawerButton}>Planning</Text>
            </TouchableOpacity>
		</View>

    )
}

const styles = StyleSheet.create({
    container: {
        top: '18%', 
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