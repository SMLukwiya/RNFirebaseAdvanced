import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { fadeTransition } from '../../utils/config';

// screens
import LoginScreen from '../../components/screens/auth/login';
import SignupScreen from '../../components/screens/auth/signup';

// component
import HeaderLeft from '../../components/reusable/headerLeft';

const Stack = createStackNavigator();

const auth = () => 
    <Stack.Navigator
        initialRouteName='signin'
    >
        <Stack.Screen
            name='signin'
            component={LoginScreen}
            options={({navigation}) => ({
                title: '',
                headerTransparent: true,
                cardStyleInterpolator: fadeTransition,
                // headerLeft: () => <HeaderLeft />,
                headerTitle: 'Sign in',
                headerTitleAlign: 'center'
            })}
        />
        <Stack.Screen
            name='signup'
            component={SignupScreen}
            options={({navigation}) => ({
                title: '',
                headerTransparent: true,
                cardStyleInterpolator: fadeTransition,
                headerLeft: () => <HeaderLeft onPress={() => navigation.goBack()} icon={true} />,
                headerTitle: 'Sign up',
                headerTitleAlign: 'center'
            })}
        />
    </Stack.Navigator>

export default auth;