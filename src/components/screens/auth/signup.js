import React, {lazy, useState} from 'react';
import { View, ScrollView, KeyboardAvoidingView, useWindowDimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';

import Container from '../../reusable/container';
import { colors, sizes } from '../../../utils/config';

// 
import { signUpEmail } from '../../../store/user';

const Text = lazy(() => import('../../reusable/text'));
const Input = lazy(() => import('../../reusable/input'));
const Switch = lazy(() => import('../../reusable/switch'));
const Button = lazy(() => import('../../reusable/button'));

const TitleContainer = styled(View)`
    marginBottom: ${sizes.small * 1.25}px;
`

const SignupContainer = styled(View)`
    flexDirection: row;,
    alignItems: center;
    justifyContent: center;
    marginTop: ${sizes.small * 1.5}px;
    marginBottom: ${sizes.small * 1.5}px;
`

const Signup = (props) => {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // input 
    const { handleChange, values, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: { username: '', email: '', password: ''},
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(6, 'Minimun of 6 characters').required('Password is required')
        }),
        onSubmit: async values => {
            const results = await dispatch(signUpEmail(values));

            if (signUpEmail.fulfilled.match(results)) {
                props.navigation.navigate('dashboard');
            } else {
                Alert.alert(results.payload);
            }
        }
    });

    // user
    const {loading} = useSelector(state => state.user);
    // remote configs
    const {
        values: {
            createAccountTextLabel, createAccountInstructionTextLabel, continueWithGoogleButtonTextLabel,
            connectWithTwitterButtonTextLabel, alreadyHaveAccountTextLabel, rememberMeTextLabel, forgotPasswordTextLabel,
            signInButtonTextLabel, orTextLabel
        }
    } = useSelector(state => state.remoteConfigs);

    return (
        <Container
            barStyle='dark-content' barTranslucent={true}
        >
            <Spinner visible={loading} color={colors.white} animation='fade' overlayColor='rgba(0,0,0,.25)' size='large' textContent='Please wait' />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView 
                    behavior={'height'} 
                    style={[styles.container, { height: height - headerHeight, marginTop: headerHeight, width: width }]}
                >
                    <TitleContainer>
                        <Text variant='body'>{createAccountTextLabel}</Text>
                        <Text variant='caption'>{createAccountInstructionTextLabel}</Text>
                    </TitleContainer>
                    <View>
                        <Input
                            placeholder={'Username'}
                            onChangeText={handleChange('username')}
                            keyboardType='default'
                            onBlur={handleBlur('username')}                           
                            value={values.username}
                            error={errors.username}
                         />
                         <Input
                            placeholder={'Email'}
                            onChangeText={handleChange('email')}
                            keyboardType='email-address'
                            onBlur={handleBlur('email')}                           
                            value={values.email}
                            error={errors.email}
                         />
                         <Input
                            placeholder={'Password'}
                            onChangeText={handleChange('password')}
                            keyboardType='default'
                            onBlur={handleBlur('password')}
                            secureTextEntry={true}
                            value={values.password}
                            error={errors.password}
                         />
                    </View>
                    <Button
                        buttonText={createAccountTextLabel}
                        backgroundColor={colors.black}
                        padding={sizes.medium}
                        textColor={colors.white}
                        enabled
                        onPress={handleSubmit}
                    />
                    <SignupContainer>
                        <Text variant='caption'>{alreadyHaveAccountTextLabel}</Text>
                        <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.navigate('signin')}>
                            <Text variant='caption'>{signInButtonTextLabel}</Text>
                        </TouchableOpacity> 
                    </SignupContainer>
                    <SignupContainer>
                        <Text variant='body'>{orTextLabel}</Text>
                    </SignupContainer>
                    <Button
                        buttonText={continueWithGoogleButtonTextLabel}
                        backgroundColor={colors.darkGray}
                        padding={sizes.medium}
                        textColor={colors.white}
                    />
                    <Button
                        buttonText={connectWithTwitterButtonTextLabel}
                        backgroundColor={colors.gray}
                        padding={sizes.medium}
                        textColor={colors.white}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: sizes.medium
    }
})

export default Signup