import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../components/context';
import { sha256 } from 'js-sha256';


export default function Login() {
    const { signIn } = useContext(AuthContext);
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    function onpress() {
        signIn(data.username,sha256(data.password))
    }
    return (
        <View style={styles.background}>
            <View style={styles.title}>
                <Image source={require('../assets/images/gbLogo.png')} style={styles.titleImage} />
                {/* <Text style={styles.titleImageTempText}>Greenbrothers</Text> */}
                <Text style={styles.titleText}>Schoonmaak Planning</Text>
            </View>

            <View style={styles.loginInfo}>
                <View style={styles.inputField}>
                    <FontAwesomeIcon icon={faUser} size={40} style={{ marginLeft: '3%', color: '#A5A1A1' }} />
                    <TextInput placeholder="Gebruikersnaam" style={styles.textInput} onChangeText={(text) => setData({...data, username: text})}/>
                </View>
                <View style={styles.inputField}>
                    <FontAwesomeIcon icon={faLock} size={40} style={{ marginLeft: '3%', color: '#A5A1A1' }} />
                    <TextInput placeholder="Wachtwoord" style={styles.textInput} secureTextEntry={true} onChangeText={(text) => setData({...data, password: text})}/>
                </View>

                <View style={styles.login}>
                    <TouchableOpacity onPress={() => onpress()} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableHighlight style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Wachtwoord vergeten?</Text>
                </TouchableHighlight>
            </View>

            <Text style={styles.madeBy}>Gemaakt door: Yoeri Smits</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#5A0E56',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        position: 'absolute',
        top: '10%',
        backgroundColor: 'white',
        width: '90%',
        height: '25%',
        borderColor: '#470B44',
        borderWidth: 2,
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleImage: {
        width: '90%',
        height: '30%',
        aspectRatio: 1,
        resizeMode: 'contain'
    },
    titleImageTempText: {
        width: '100%',
        height: '40%'
    },
    titleText: {
        fontSize: 45,
        fontWeight: 900,
        color: '#470B44',
        textAlign: 'center'
    },
    loginInfo: {
        position: 'relative',
        marginTop: '40%',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        backgroundColor: 'white',
        width: '80%',
        height: '7%',
        marginBottom: '2%',
        borderRadius: 6,
        borderColor: '#470B44',
        borderWidth: 2,
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInput: {
        marginLeft: '5%',
        height: '100%',
        fontSize: 20
    },
    login: {
        width: '80%',
        height: '7%'
    },
    loginButton: {
        backgroundColor: '#470B44',
        borderColor: '#707070',
        borderWidth: 2,
        borderRadius: 6,
        height: '100%'
    },
    loginButtonText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 7
    },
    forgotPassword: {
    },
    forgotPasswordText: {
        color: '#A5A1A1',
        fontSize: 17
    },
    madeBy: {
        fontSize: 17,
        color: 'white',
        position: 'absolute',
        bottom: 10
    }
});