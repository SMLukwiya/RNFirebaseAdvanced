import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 
import account from '../../../components/screens/dashboard/account';
import orders from '../../../components/screens/dashboard/orders';
import HeaderLeft from '../../../components/reusable/headerLeft';
import Notifications from '../../../components/reusable/notifications';
import { colors, sizes } from '../../../utils/config';

const Stack = createStackNavigator();

const android = Platform.OS === 'android';

const Account = () => {

    return (
        <Stack.Navigator
            initialRouteName='splash'
            screenOptions={{
                
            }}
        >
            <Stack.Screen
                name='account'
                component={account}
                options={({navigation}) => ({
                    title: 'Profile',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: android ? sizes.medium * 1.25 : sizes.medium
                    },
                    headerLeft: () => <HeaderLeft icon  onPress={() => navigation.goBack()} />,
                    headerRight: () => <Ionicons name='notifications-outline' size={25} onPress={() => {}} />,
                    headerStyle: {
                        backgroundColor: colors.lightGray,
                    },
                    headerRightContainerStyle: {
                        paddingRight: sizes.medium
                    }
                })}
            />
            <Stack.Screen 
                name="orders"
                component={orders}
                options={({navigation}) => ({
                    title: 'My Orders',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: android ? sizes.medium * 1.15 : sizes.medium * .95
                    },
                    headerLeft:() => <HeaderLeft icon onPress={() => navigation.goBack()} />,
                    headerRight: () => <Notifications count={3} onPress={() => navigation.navigate('notifications')} />,
                    headerStyle: {
                        backgroundColor: colors.white
                    },
                    headerRightContainerStyle: {
                        paddingRight: sizes.small
                    }
                })}
            />
        </Stack.Navigator>
    )
}

export default Account;