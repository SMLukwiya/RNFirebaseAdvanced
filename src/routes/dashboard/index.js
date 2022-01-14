import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 
import homeStack from './home';
import accountStack from './account';
import favStack from './fav';
import { colors } from '../../utils/config';

const Tab = createBottomTabNavigator();

const Tabs = () => 
    <Tab.Navigator 
        initialRouteName='homestack'
        screenOptions={{
            headerShown: false
        }}
        >
        <Tab.Screen
            name='homestack'
            component={homeStack}
            options={() => ({
                title: '',
                tabBarLabel: 'Home',
                tabBarIcon: ({focused}) => <Ionicons name='home' size={25} color={focused ? colors.black : colors.gray} />,
                tabBarLabelStyle: { color: colors.black }
            })}
        />
        <Tab.Screen
            name='favourites'
            component={favStack}
            options={() => ({
                title: '',
                tabBarLabel: 'Fav',
                tabBarIcon: ({focused}) => <Ionicons name='save' size={25} color={focused ? colors.black : colors.gray} />,
                tabBarLabelStyle: { color: colors.black }
            })}
        />
        <Tab.Screen
            name='accountStack'
            component={accountStack}
            options={() => ({
                title: '',
                tabBarLabel: 'Me',
                tabBarIcon: ({focused}) => <Ionicons name='person-circle' size={25} color={focused ? colors.black : colors.gray} />,
                tabBarLabelStyle: { color: colors.black }
            })}
        />
    </Tab.Navigator>

export default Tabs;