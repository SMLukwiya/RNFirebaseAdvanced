import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import home from '../../../components/screens/dashboard/home';
import products from '../../../components/screens/dashboard/products';
import product from '../../../components/screens/dashboard/products/product';
import cart from '../../../components/screens/dashboard/cart';
import checkout from '../../../components/screens/dashboard/checkout';
import HeaderLeft from '../../../components/reusable/headerLeft';
import CartIcon from '../../../components/reusable/cartIcon';
import { colors, sizes } from '../../../utils/config';

const Stack = createStackNavigator();
const android = Platform.OS === 'android';

const Home = () => {
    const {username} = useSelector(state => state.user);
    const cartRedux = useSelector(state => state.cart);

    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                // headerShown: false
            }}
        >
        <Stack.Screen 
            name="home"
            component={home}
            options={{
                title: '',
                headerLeft:() => <HeaderLeft text={`Hi ${username}`} />,
                // headerRight: () => <HeaderLeft text='Location' />,
                // headerTransparent: true,
                headerStyle: {
                    backgroundColor: colors.lightGray
                }
            }}
        />
        <Stack.Screen 
            name="products"
            component={products}
            options={({navigation, route}) => ({
                title: route.params.name,

                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: android ? sizes .medium * 1.25 : sizes.medium * .95
                },
                headerLeft:() => <HeaderLeft icon onPress={() => navigation.goBack()} />,
                headerStyle: {
                    backgroundColor: colors.white
                }
            })}
        />
        <Stack.Screen 
            name="product"
            component={product}
            options={({navigation}) => ({
                title: '',
                headerTitleStyle: {
                    fontSize: sizes.medium * .95,
                },
                headerLeft:() => <HeaderLeft icon onPress={() => navigation.goBack()} />,
                headerRight: () => <CartIcon onPress={() => navigation.navigate('cart')} count={Object.keys(cartRedux.products).length} />,
                headerStyle: {
                    backgroundColor: colors.white
                },
                headerRightContainerStyle: {
                    paddingRight: sizes.small
                }
            })}
        />
        <Stack.Screen 
            name="cart"
            component={cart}
            options={({navigation}) => ({
                title: 'My Cart',
                headerTitleStyle: {
                    fontSize: android ? sizes.medium * 1.2 : sizes.medium * .95,
                },
                headerTitleAlign: 'center',
                headerLeft:() => <HeaderLeft icon onPress={() => navigation.goBack()} />,
                headerStyle: {
                    backgroundColor: colors.white,
                }
            })}
        />
        <Stack.Screen 
            name="checkout"
            component={checkout}
            options={({navigation}) => ({
                title: 'Checkout',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: android ? sizes.medium * 1.2 : sizes.medium * .95
                },
                headerLeft:() => <HeaderLeft icon onPress={() => navigation.goBack()} />,
                headerStyle: {
                    backgroundColor: colors.white
                }
            })}
        />
    </Stack.Navigator>
    )
}

export default Home;