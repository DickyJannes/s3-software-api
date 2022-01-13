import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Task from '../screens/task';
import React from "react";
import Header from '../shared/header';

const screens = {
    Task: {
        screen: Task,
        navigationOptions:  ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Taken'/>,
            }
        }
    }
}

const taskStack = createStackNavigator(screens);

export default taskStack;