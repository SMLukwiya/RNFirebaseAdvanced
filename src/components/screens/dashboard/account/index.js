import React, {useState, lazy} from 'react';
import { View, Image, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, PermissionsAndroid, Platform } from 'react-native';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CommonActions } from '@react-navigation/native';

import Container from '../../../reusable/container';
import { colors, images, sizes } from '../../../../utils/config';
import { signOut } from '../../../../store/user';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));
const Switch = lazy(() => import('../../../reusable/switch'));
const RnModal = lazy(() => import('../../../reusable/modal'));

// 
const Header = styled(View)`
    width: 100%;
    height: ${sizes.large * 2.75}px;
    backgroundColor: ${colors.lightGray};
    borderBottomLeftRadius: ${sizes.medium}px;
    borderBottomRightRadius: ${sizes.medium}px;
    overflow: hidden;
    justifyContent: center;
`

const ProfileContainer = styled(View)`
    flexDirection: row;
    alignItems: center;
    marginLeft: ${sizes.medium}px;
`

const ImageContainer = styled(TouchableOpacity)`
    height: ${sizes.large * 2}px;
    width: ${sizes.large * 2}px;
    borderRadius: ${(sizes.large * 2)/2}px;
    overflow: hidden;
`

const StyleImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const ProfileTextContainer = styled(View)`
    marginLeft: ${sizes.small}px;
    width: 100%;
`

const TopMenuContainer = styled(View)`
    width: 80%;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    marginTop: ${sizes.small}px;
    marginBottom: ${sizes.small}px;
    backgroundColor: ${colors.lightGray};
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
    borderRadius: ${sizes.small}px;
`
// 
const TopMenuItem = styled(TouchableOpacity)`
    width: 30%;
    justifyContent: center;
    alignItems: center;
    paddingTop: ${sizes.small * .4}px;
`
const TopMenuImageContainer = styled(View)`
    height: ${sizes.large}px;
    width: ${sizes.large}px;
    borderRadius: ${(sizes.large)/2}px;
    overflow: hidden;
`

const MainMenuContainer = styled(ScrollView)``

const MenuComponent = styled(View)`
    width: 100%;
    padding: ${sizes.small}px;
`

const MenuComponentSubContainer = styled(TouchableOpacity)`
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
    marginTop: ${sizes.small}px;
`

const MenuComponentItem = styled(View)``

const ButtonContainer = styled(View)`
    width: 80%;
`

const ModalContainer = styled(View)`
    background-color: ${colors.white};
    border-radius: ${sizes.medium}px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 90%;
`
const ModalButtonContainer = styled(View)`
    width: 80%;
`

const topMenu = [{title: 'My Orders'}, {title: 'Offer & Promos'}, {title: 'Delivery Address'}]

// permissions options
const options = {
    title: 'App Camera Permission',
    message: 'App needs permission for camera for better experience',
    buttonNeutral: 'Ask me later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK'
}

const Account = (props) => {
    const dispatch = useDispatch();
    const { width, height } = useWindowDimensions()

    // state
    const [isNotificationEnabled, setNotificationEnabled] = useState(false);
    const [isPromNotificationEnabled, setPromNotificationEnabled] = useState(false);
    const [modal, setModal] = useState(false);
    const [image, setImage] = useState({});

    // user
    const {username, userEmail} = useSelector(state => state.user);
    // remote config
    const {
        values: {
            myAccountTitleTextLabel, notificationTextLabel, moreTextLabel, logoutTextLabel,
            manageProfileTextLabel, paymentTextLabel, promotionalNotificationTextLabel, themeModeTextLabel,
            useCameraTextLabel, usePhotoLibraryTextLabel
        }
    } = useSelector(state => state.remoteConfigs);

    // switch handler
    const switchNotification = () => setNotificationEnabled(prevState =>!prevState);
    const switchPromNotification = () => setPromNotificationEnabled(prevState =>!prevState);

    // modal
    const switchModal = () => setModal(prevState => !prevState);

    // image handler
    const requestCameraPermission = async(granted) => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, options);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setModal(true);
            } else {
                console.log('Permission denied')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const imageOption = {
        mediaType: 'photo',
        quality: 1,
        cameraType: 'front',
        saveToPhotos: true
    }

    const imageHandler = (option) => {
        switchModal();
        if (option === 'camera') {
            launchCamera(imageOption, response => {
                if (response.didCancel) return console.log('Operation cancelled')
                else if (response.errorCode) return console.log(`Operation cancelled with error code ${response.errorCode}`)
                else {
                    const image = response.assets[0]
                    setImage(image)
                }
            })
        } else {
            launchImageLibrary(imageOption, response => {
                if (response.didCancel) return console.log('Operation cancelled')
                else if (response.errorCode) return console.log(`Operation cancelled with error code ${response.errorCode}`)
                else {
                    const image = response.assets[0]
                    setImage(image)
                }
            })
        }
    }

    const onChangeProfileImageHandler = () => {
        if (Platform.OS === 'android') {
            const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, options);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) setModal(true)
            else requestCameraPermission();
        } else {
            setModal(true);
        }
    }

    // log out
    const logoutHandler = async() => {
        try {
            dispatch(signOut());
            props.navigation.dispatch(
                CommonActions.reset({
                    type: 'stack',
                    index: 0,
                    routes: [{name: 'auth'}]
                })
            )
        } catch (err) {
            console.log('Logout err ', err);
        }
    }

    const itemComponent = (image, title, onPress) => 
        <TopMenuItem activeOpacity={.8} onPress={onPress}>
            <TopMenuImageContainer>
                <StyleImage source={image} resizeMode='cover' />
            </TopMenuImageContainer>
            <Text variant='menu'>{title}</Text>
        </TopMenuItem>

    return (
        <Container
            barStyle='dark-content' 
            barTranslucent={true}
        >
            <Header>
                <ProfileContainer>
                    <ImageContainer activeOpacity={.8} onPress={onChangeProfileImageHandler}>
                        <StyleImage source={ image.uri ? {uri: image.uri} : images.default} resizeMode='cover' />
                    </ImageContainer>
                    <ProfileTextContainer>
                        <Text variant='body'>{username}</Text>
                        <Text variant='excerpt'>{userEmail}</Text>
                    </ProfileTextContainer>
                </ProfileContainer>
            </Header>
            <TopMenuContainer>
                {topMenu.map(({title}) => itemComponent(images.placeholder, title))}
            </TopMenuContainer>
            <MainMenuContainer
                contentContainerStyle={[styles.mainMenuContainer, {height: Platform.OS === 'android' ? height * .575 : height * .55, width: width * .8}]}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <MenuComponent>
                    <Text 
                        variant='custom'
                        fontSize={ Platform.OS === 'android' ? sizes.medium : sizes.medium * .85}
                        textColor={colors.black}
                        margin={sizes.small}
                        fontWeight={'bold'}
                    >
                        {myAccountTitleTextLabel}
                    </Text>
                    <MenuComponentItem>
                        <MenuComponentSubContainer activeOpacity={.8} onPress={() => {}}>
                            <Text variant='menu'>
                                {manageProfileTextLabel}
                            </Text>
                            <Ionicons name='chevron-forward' size={18} color={colors.darkGray} />
                        </MenuComponentSubContainer>
                        <MenuComponentSubContainer activeOpacity={.8} onPress={() => {}}>
                            <Text variant='menu'>{paymentTextLabel}</Text>
                            <Ionicons name='chevron-forward' size={18} color={colors.darkGray} />
                        </MenuComponentSubContainer>
                    </MenuComponentItem>
                </MenuComponent>

                <MenuComponent>
                    <Text 
                        variant='custom'
                        fontSize={ Platform.OS === 'android' ? sizes.medium : sizes.medium * .85}
                        textColor={colors.black}
                        margin={sizes.small}
                        fontWeight={'bold'}
                    >
                        {notificationTextLabel}
                    </Text>
                    <MenuComponentItem>
                        <MenuComponentSubContainer activeOpacity={.8}>
                            <Text variant='menu'>{notificationTextLabel}</Text>
                            <Switch
                                disabled={false}
                                ios_backgroundColor={colors.darkGray}
                                onValueChange={switchNotification}
                                thumbColor={isNotificationEnabled ? colors.green : colors.gray}
                                trackColor={colors.lightBlue}
                                value={isNotificationEnabled}
                                switchText={''}
                            />
                        </MenuComponentSubContainer>
                        <MenuComponentSubContainer activeOpacity={.8}>
                            <Text variant='menu'>{promotionalNotificationTextLabel}</Text>
                            <Switch
                                disabled={false}
                                ios_backgroundColor={colors.darkGray}
                                onValueChange={switchPromNotification}
                                thumbColor={isPromNotificationEnabled ? colors.green : colors.gray}
                                trackColor={colors.lightBlue}
                                value={isPromNotificationEnabled}
                                switchText={''}
                            />
                        </MenuComponentSubContainer>
                    </MenuComponentItem>
                </MenuComponent>

                <MenuComponent>
                    <Text 
                        variant='custom'
                        fontSize={ Platform.OS === 'android' ? sizes.medium : sizes.medium * .85}
                        textColor={colors.black}
                        margin={sizes.small}
                        fontWeight={'bold'}
                    >
                        {moreTextLabel}
                    </Text>
                    <MenuComponentItem>
                        <MenuComponentSubContainer activeOpacity={.8} onPress={() => {}}>
                            <Text variant='menu'>{themeModeTextLabel}</Text>
                            <Ionicons name='chevron-forward' size={18} color={colors.darkGray} />
                        </MenuComponentSubContainer>
                    </MenuComponentItem>
                </MenuComponent>

                <ButtonContainer>
                    <Button
                        buttonText={logoutTextLabel}
                        backgroundColor={colors.darkGray}
                        padding={sizes.medium}
                        textColor={colors.white}
                        enabled
                        onPress={logoutHandler}
                    />
                </ButtonContainer>
            </MainMenuContainer>
            <RnModal visible={modal} onRequestClose={switchModal}>
                <ModalContainer>
                    <ModalButtonContainer>
                        <Button
                            buttonText={useCameraTextLabel}
                            backgroundColor={colors.gray}
                            padding={sizes.medium}
                            textColor={colors.white}
                            enabled
                            onPress={imageHandler.bind(this, 'camera')}
                        />
                        <Button
                            buttonText={usePhotoLibraryTextLabel}
                            backgroundColor={colors.gray}
                            padding={sizes.medium}
                            textColor={colors.white}
                            enabled
                            onPress={imageHandler.bind(this, 'photos')}
                        />
                    </ModalButtonContainer>
                </ModalContainer>
            </RnModal>
        </Container>
    )
}

const styles = StyleSheet.create({
    mainMenuContainer: {
        backgroundColor: colors.lightGray,
        borderRadius: sizes.small,
        overflow: 'hidden',
        alignItems: 'center'
    }
});

export default Account;