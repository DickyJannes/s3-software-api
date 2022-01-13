import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Planning from '../screens/planning';
import React from "react";
import Header from '../shared/header';

const screens = {
    Planning: {
        screen: Planning,
        navigationOptions:  ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Planning'/>,
            }
        }
    }
}

const planningStack = createStackNavigator(screens);

export default planningStack;