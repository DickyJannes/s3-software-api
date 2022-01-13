import { createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import Header from '../shared/header';
import React from 'react';

const screens = {
    Home: {
        screen: Home,
        navigationOptions:  ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Hoofdscherm'/>,
            }
        }
    }
}

const homeStack = createStackNavigator(screens);

export default homeStack;