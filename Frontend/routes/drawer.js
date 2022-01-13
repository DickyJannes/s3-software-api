import React from "react";
import { View, SafeAreaView } from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import homeStack from "./homeStack";
import taskStack from "./taskStack";
import planningStack from "./planningStack";
import userStack from "./userStack";

import Logout from "../screens/drawer/logout";
import Task from "../screens/drawer/task";
import Home from "../screens/drawer/home";
import Planning from "../screens/drawer/planning";
import Users from "../screens/drawer/users";

const RootDrawerNavigator = createDrawerNavigator(
    {
    Schoonmaak_Planning: {
        screen: homeStack
    },
    task: {
        screen: taskStack
    },
    planning: {
        screen: planningStack
    },
    users: {
        screen: userStack
    }
},
{
	contentComponent:(props) => (
		<View style={{height: '100%', width: '100%', backgroundColor: '#5A0E56'}}>
				<SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
				<DrawerItems {...props} />
                <Home navigation={props}/>
                <Task navigation={props}/>
                <Planning navigation={props}/>
                <Users navigation={props}/>
				<Logout />
			</SafeAreaView>
		</View>
	)
},
);

export default createAppContainer(RootDrawerNavigator);