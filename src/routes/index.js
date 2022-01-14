import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import splash from '../components/screens/splashScreen';
import authStack from './auth';
import dashboardStack from './dashboard';

const Stack = createStackNavigator();

const Main = () =>
    <Stack.Navigator
        initialRouteName='splash'
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen
            name='splash'
            component={splash}
            options={{
                title: ''
            }}
        />
        <Stack.Screen
            name='auth'
            component={authStack}
        />
        <Stack.Screen
            name='dashboard'
            component={dashboardStack}
        />
    </Stack.Navigator>

export default Main;