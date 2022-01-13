import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import styles from "./globalStyles";
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation, title }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon}/>
            <Image
                style={styles.headerIcon}
                source={require('../assets/images/gbLogo.png')}
            />
        </View>
    )
}