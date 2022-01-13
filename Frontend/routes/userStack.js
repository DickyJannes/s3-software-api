import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Users from '../screens/users';
import React from "react";
import Header from '../shared/header';

const screens = {
    Users: {
        screen: Users,
        navigationOptions:  ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Taken'/>,
            }
        }
    }
}

const taskStack = createStackNavigator(screens);

export default taskStack;