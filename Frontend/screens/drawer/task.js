import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../components/context";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import globalStyles from "../../shared/globalStyles";

export default function Task (props){
    const { signOut } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.navigation.navigate('task')} style={styles.button}>
                <FontAwesomeIcon icon={faCheckSquare} size={30} color="white"/>
                <Text style={globalStyles.drawerButton}>Taken</Text>
            </TouchableOpacity>
		</View>

    )
}

const styles = StyleSheet.create({
    container: {
        top: '12.5%', 
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