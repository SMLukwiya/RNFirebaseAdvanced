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
import { signInEmail } from '../../../store/user';

const Text = lazy(() => import('../../reusable/text'));
const Input = lazy(() => import('../../reusable/input'));
const Switch = lazy(() => import('../../reusable/switch'));
const Button = lazy(() => import('../../reusable/button'));

const TitleContainer = styled(View)`
    marginBottom: ${sizes.small * 1.25}px;
`

const SwitchContainer = styled(View)`
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
`

const SignupContainer = styled(View)`
    flexDirection: row;,
    alignItems: center;
    justifyContent: center;
    marginTop: ${sizes.small * 1.5}px;
    marginBottom: ${sizes.small * 1.5}px;
`

const Login = (props) => {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const headerHeight = useHeaderHeight();

    // state
    const [isSwitchEnabled, setSwitchEnabled] = useState(false);

    // input 
    const { handleChange, values, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: { email: '', password: ''},
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: async values => {
            const results = await dispatch(signInEmail(values));

            if (signInEmail.fulfilled.match(results)) {
                props.navigation.navigate('dashboard')
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
            welcomeToLoginTextLabel, loginInstructionTextLabel, signInButtonTextLabel, continueWithGoogleButtonTextLabel,
            connectWithTwitterButtonTextLabel, donotHaveAnAccountTextLabel, rememberMeTextLabel, forgotPasswordTextLabel,
            signUpTextLabel, orTextLabel
        }
    } = useSelector(state => state.remoteConfigs);

    // switch handler
    const switchHandler = (value) => setSwitchEnabled(prevState => !prevState);

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
                        <Text variant='body'>{welcomeToLoginTextLabel}</Text>
                        <Text variant='caption'>{loginInstructionTextLabel}</Text>
                    </TitleContainer>
                    <View>
                        <Input
                            placeholder={'Email'}
                            onChangeText={handleChange('email')}
                            keyboardType='default'
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
                    <SwitchContainer>
                        <Switch
                            disabled={false}
                            ios_backgroundColor={colors.darkGray}
                            onValueChange={switchHandler}
                            thumbColor={isSwitchEnabled ? colors.green : colors.gray}
                            trackColor={colors.lightBlue}
                            value={isSwitchEnabled}
                            switchText={rememberMeTextLabel}
                        />
                        <TouchableOpacity activeOpacity={.8} onPress={() => {}}>
                            <Text variant='caption'>{forgotPasswordTextLabel}</Text>
                        </TouchableOpacity>
                    </SwitchContainer>
                    <Button
                        buttonText={signInButtonTextLabel}
                        backgroundColor={colors.black}
                        padding={sizes.medium}
                        textColor={colors.white}
                        enabled
                        onPress={handleSubmit}
                    />
                    <SignupContainer>
                        <Text variant='caption'>{donotHaveAnAccountTextLabel}</Text>
                        <TouchableOpacity activeOpacity={.8} onPress={() => props.navigation.navigate('signup')}>
                            <Text variant='caption'>{signUpTextLabel}</Text>
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

export default Login