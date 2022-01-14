import React, { lazy, useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';

import Container from '../../../reusable/container';;
import { colors, sizes, images } from '../../../../utils/config';

// 
import { updateProfile } from '../../../../store/user';

const Text = lazy(() => import('../../../reusable/text'));
const Search = lazy(() => import('../../../reusable/search'));
const Card = lazy(() => import('../../../reusable/card'));

const Header = styled(View)`
    height: ${sizes.large * 4.5}px;
    backgroundColor: ${colors.lightGray};
    borderBottomLeftRadius: ${sizes.medium}px;
    borderBottomRightRadius: ${sizes.medium}px;
    width: 100%;
    paddingHorizontal: ${sizes.small}px;
`

const MenuItemContainer = styled(TouchableOpacity)`
    background-color: ${colors.darkGray};
    margin-right: ${sizes.small * .65}px;
    border-radius: ${sizes.small}px;
    overflow: hidden;
    padding: ${sizes.small * .25}px;
`

const Fav = styled(View)`
    marginTop: ${sizes.small}px;
    paddingLeft: ${sizes.small * 1.5}px;
`

const FavContainer = styled(ScrollView)`
    
`

const ChefContainer = styled(ScrollView)`
    
`

const menu = ['Breakfast', 'Lunch', 'Drinks', 'Dessert']

const Home = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // input 
    const { handleChange, values, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: { search: '' },
        validationSchema: Yup.object({
            search: Yup.string().required('Search is required')
        }),
        onSubmit: value => {

        }
    });

    // user
    const {userId} = useSelector(state => state.user);
    // remote configs
    const {
        values: {
            
        }
    } = useSelector(state => state.remoteConfigs);

    // update user profile
    const updateUserProfile = () => {
        firestore()
            .collection('users')
            .doc(userId)
            .onSnapshot(docSnapShot => {
                // all user keys
                const keys = ['username', 'imageUrl', 'fav'];
                keys.forEach(key => {
                    dispatch(updateProfile({key, value: docSnapShot._data[key]}))
                })
            }, err => {
                console.log('User profile error ', err);
            })
    }

    useEffect(() => {
        updateUserProfile();
    }, [])

    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <Header 
                    style={{paddingTop: sizes.small}}>
                    <Search
                        value={values.search}
                        onBlur={handleBlur('search')}
                        onChangeText={handleChange('search')}
                    />
                    <ScrollView 
                        horizontal
                        contentContainerStyle={styles.menuContainer}
                    >
                        {menu.map(item => 
                            <MenuItemContainer activeOpacity={.8} key={item} onPress={() => navigation.navigate('products', {id: item, name: item})}>
                                <Text variant='menu'>{item}</Text>
                            </MenuItemContainer>
                        )}
                    </ScrollView>
                </Header>
                <Fav>
                    <Text variant="body">Favourite</Text>
                    <FavContainer
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                    >
                        {menu.map((item) => 
                            <Card 
                                key={item}
                                image={images.placeholder}
                                title='Chef Name'
                                excerpt='Brief on the chef'
                                rate='4.5'
                                time='20 Mins'
                            />
                        )}
                    </FavContainer>
                </Fav>
                <Fav>
                    <Text variant="body">Trending</Text>
                    <ChefContainer
                        contentContainerStyle={styles.chefContainer}
                    >
                        {menu.map((item) => 
                            <Card 
                                chef={true}
                                key={item}
                                image={images.default}
                                title='Chef Name'
                                excerpt='Brief on the chef'
                                rate='4.5'
                                time='20 Mins'
                                width={width * .8}
                            />
                        )}
                    </ChefContainer>
                </Fav>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: sizes.medium
    },
    menuContainer: {
        marginTop: sizes.medium,
        position: 'absolute',
        bottom: sizes.small * 1.5,
        justifyContent: 'center',
        width: '100%'
    },
    chefContainer: {
        alignItems: 'center'
    }
})

export default Home