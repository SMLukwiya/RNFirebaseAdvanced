import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 
import fav from '../../../components/screens/dashboard/fav';
import HeaderLeft from '../../../components/reusable/headerLeft';
import { colors, sizes } from '../../../utils/config';

const Stack = createStackNavigator();

const Favourites = () => {

    return (
        <Stack.Navigator
            initialRouteName='favourite'
            screenOptions={{
                
            }}
        >
            <Stack.Screen
                name='favourite'
                component={fav}
                options={({navigation}) => ({
                    title: 'My Fav',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: Platform.OS === 'android' ? sizes.medium * 1.25 : sizes.medium
                    },
                    headerLeft: () => <HeaderLeft icon  onPress={() => navigation.goBack()} />,
                    headerStyle: {
                        backgroundColor: colors.white,
                    }
                })}
            />
        </Stack.Navigator>
    )
}

export default Favourites;