import React, {lazy, useState} from 'react';
import { View, Image, StyleSheet, ScrollView,useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';
import { removeFromCart, addQuantity, reduceQuanity } from '../../../../store/cart';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));
const RNModal = lazy(() => import('../../../reusable/modal'));
const Input = lazy(() => import('../../../reusable/input'));

const android = Platform.OS === 'android';

const CartComponentContainer = styled(View)`
    flex-direction: row;
    border-radius: ${sizes. small}px;
    overflow: hidden;
    margin-top: ${sizes.small}px;
    margin-bottom: ${sizes.small}px;
    height: ${sizes.large * 2.5}px;
`

const ImageContainer = styled(View)`
    width: 25%;
    height: 100%;
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const CartContentContainer = styled(View)`
    width: 75%;
    height: 100%;
    padding-left: ${sizes.small}px;
    padding-top: ${sizes.small * .5}px;
    padding-bottom: ${sizes.small * .5}px; 
    justify-content: space-between;
`

const TitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const PriceContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const DeliveryAddressContainer = styled(View)`
    border-width: 1px;
    border-color: ${colors.lightGray};
    border-radius: ${sizes.small}px;
    overflow: hidden;
    padding-top: ${sizes.small}px;
    padding-bottom: ${sizes.small}px;
    padding-right: ${sizes.small * .5}px;
    padding-left: ${sizes.small * .5}px;
    margin-top: ${sizes.small * 1.5}px;
    margin-bottom: ${sizes.small * 1.5}px;
`

const DeliveryAddressTitle = styled(View)`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ChangeAddressButtonStyle = styled(TouchableOpacity)`
    padding: ${sizes.small * .5}px;
    background-color: ${colors.gray};
    border-radius: ${sizes.small * .5}px;
    overflow: hidden;
`

const DeliveryAddressLocationContainer = styled(View)`
    flex-direction: row;
    align-items: flex-start;
    margin-top: ${sizes.small}px;
`

const PaymentMethodContainer = styled(View)`
    padding-top: ${sizes.small}px;
    margin-bottom: ${sizes.small * 1.5}px;
`

const ChangePaymentContainerStyle = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const PaymentItemContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${android ? sizes.small * 1.5 : sizes.small}px;
    background-color: ${colors.lightGray};
    border-radius: ${sizes.small}px;
    overflow: hidden;
    margin-top: ${sizes.small * 1.5}px;
`

const PaymentTypeContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const Divider = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${colors.lightGray};
`

const ItemPriceContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${sizes.small}px;
    padding-bottom: ${sizes.small}px;
`

const PaymentContainer = styled(View)`
    background-color: ${colors.white};
    padding: ${sizes.small}px;
    border-radius: ${sizes.small}px;
    overflow: hidden;
    width: 80%;
    align-items: center;
`

const NetworkContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
    margin-bottom: ${sizes.small}px;
`

const NetworkItem = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    margin-left: ${sizes.small}px;
`

const SelectedNetWorkItem = styled(View)`
    background-color: ${({selected}) => selected ? colors.black : colors.white};
    height: ${sizes.medium * .9}px;
    width: ${sizes.medium * .9}px;
    border-radius: ${sizes.medium *.9 * .5}px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${colors.darkGray};
    margin-right: ${sizes.small * .75}px;
`

const CardExpiryContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`

const InputContainer = styled(View)`
    width: 45%;
`

const Checkout = (props) => {
    const dispatch = useDispatch();
    const {width, height} = useWindowDimensions();
    const {navigation} = props;

    // state
    const [modal, setModal] = useState({visible: false, type: ''});

    const [payment, setPayment] = useState({type: '', details: {}})

    // redux
    // cart
    const cart = useSelector(state => state.cart);
    // remote configs
    const {
        values: {
            deliverToTextLabel, changeTextLabel, paymentMethodTextLabel, addNewTextLabel, momoTextaLabel, creditCardTextLabel,
            itemTotalTextLabel, deliveryFeeTextLabel, freeTextLabel, totalTextLabel, confirmOrderTextLabel, airtelTextLabel,
            mtnTextLabel, proceedTextLabel, enterCardDetailsTextLabel
        }
    } = useSelector(state => state.remoteConfigs);

    // cart Items
    let cartItems = [];
    for (let key in cart.products) {
        cartItems.push(cart.products[key]);
    }

    // modal handler
    const modalHandler = (type) => {
        setModal({ ...modal, type, visible: true });
    }

    const closeModal = () => {
        setModal({ ...modal, type: '', visible: false });
    }

    // const payment handler
    const selectNetworkHandler = (type) => {
        setPayment({...payment, type});
    }

    // order confirmed
    const orderConfirmHandler = () => {
        closeModal();
        navigation.navigate('orders')
    }

    const itemComponent = (id, name, price, quantity) => 
        <CartComponentContainer key={id}>
            <ImageContainer>
                <StyledImage resizeMode='cover' source={images.placeholder} />
            </ImageContainer>
            <CartContentContainer>
                <TitleContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.darkGray}>{name}</Text>
                </TitleContainer>
                <PriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{price}Ugx</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .8} fontWeight='bold' textColor={colors.black}>{quantity}</Text>
                </PriceContainer>
            </CartContentContainer>
        </CartComponentContainer>

    const paymentComponent = (active) => 
        <>
            <PaymentItemContainer activeOpacity={.8} onPress={() => modalHandler('momo')}>
                <PaymentTypeContainer>
                    <Ionicons name='phone-portrait' size={20} color={colors.black} />
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{momoTextaLabel}</Text>
                </PaymentTypeContainer>
                {active && <Ionicons name='checkmark-circle' size={20} color={colors.black} />}
            </PaymentItemContainer>
            <PaymentItemContainer activeOpacity={.8} onPress={() => modalHandler('creditcard')}>
                <PaymentTypeContainer>
                    <Ionicons name='card' size={20} color={colors.black} />
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{creditCardTextLabel}</Text>
                </PaymentTypeContainer>
                {active && <Ionicons name='checkmark-circle' size={20} color={colors.black} />}
            </PaymentItemContainer>
        </>

    const momoComponent = () => 
        <PaymentContainer>
            <NetworkContainer>
                <NetworkItem activeOpacity={.8} onPress={() => selectNetworkHandler('momo-airtel')}>
                    <SelectedNetWorkItem selected={payment.type === 'momo-airtel'} />
                    <Text variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{airtelTextLabel}</Text>
                </NetworkItem>
                <NetworkItem activeOpacity={.8} onPress={() => selectNetworkHandler('momo-mtn')}>
                    <SelectedNetWorkItem selected={payment.type === 'momo-mtn'} />
                    <Text variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{mtnTextLabel}</Text>
                </NetworkItem>
            </NetworkContainer>
            <Input
                placeholder={'Email'}
                onChangeText={{}}
                keyboardType='default'
                onBlur={()=>{}}                           
                value={''}
                error={''}
            />
            <Button 
                buttonText={proceedTextLabel}
                onPress={() => {}}
                backgroundColor={colors.darkGray}
                textColor={colors.white}
                enabled  
            />
        </PaymentContainer>

    const cardComponent = () => 
        <PaymentContainer>
            <Text variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{enterCardDetailsTextLabel}</Text>
            <Input
                placeholder={'Card Name'}
                onChangeText={{}}
                keyboardType='default'
                onBlur={()=>{}}                           
                value={''}
                error={''}
            />
            <Input
                placeholder={'Card Number'}
                onChangeText={{}}
                keyboardType='default'
                onBlur={()=>{}}                           
                value={''}
                error={''}
            />
            <CardExpiryContainer>
                <InputContainer>
                    <Input
                        placeholder={'Expiry date'}
                        onChangeText={{}}
                        keyboardType='default'
                        onBlur={()=>{}}                           
                        value={''}
                        error={''}
                    />
                </InputContainer>
                <InputContainer>
                    <Input
                        placeholder={'CVC'}
                        onChangeText={{}}
                        keyboardType='default'
                        onBlur={()=>{}}                           
                        value={''}
                        error={''}
                    />
                </InputContainer>
            </CardExpiryContainer>
            <Button 
                buttonText={proceedTextLabel}
                onPress={() => {}}
                backgroundColor={colors.darkGray}
                textColor={colors.white}
                enabled  
            />
        </PaymentContainer>

    const orderConfirmComponent = () => 
        <PaymentContainer>
            <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}>Order successful</Text>
            <Button 
                buttonText={'Order status'}
                onPress={orderConfirmHandler}
                backgroundColor={colors.darkGray}
                textColor={colors.white}
                enabled  
            />
        </PaymentContainer>

    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            <ScrollView 
                bounces={false} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{width: width * .85}}
            >
                <DeliveryAddressContainer>
                    <DeliveryAddressTitle>
                        <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.darkGray}>{deliverToTextLabel}: Home</Text>
                        <ChangeAddressButtonStyle activeOpacity={.8} onPress={() => {}}>
                            <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.white}>{changeTextLabel}</Text>
                        </ChangeAddressButtonStyle>
                    </DeliveryAddressTitle>
                    <DeliveryAddressLocationContainer>
                        <Ionicons name='location' size={18} color={colors.black} />
                        <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>Makerere University, University Hall</Text>
                    </DeliveryAddressLocationContainer>
                </DeliveryAddressContainer>
                <Text variant='custom' fontSize={sizes.medium * .8} fontWeight='bold' textColor={colors.gray}>Items:</Text>
                {cartItems.map(({id,name,unitPrice,price, quantity}) => itemComponent(id,name,price, quantity))}
                <Divider />
                <PaymentMethodContainer>
                    <ChangePaymentContainerStyle>
                        <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.gray}>{paymentMethodTextLabel}</Text>
                        <ChangeAddressButtonStyle activeOpacity={.8} onPress={() => {}}>
                            <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.white}>{addNewTextLabel}</Text>
                        </ChangeAddressButtonStyle>
                    </ChangePaymentContainerStyle>
                    {
                        paymentComponent('active')
                    }
                </PaymentMethodContainer>
                <Divider />
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.darkGray}>{itemTotalTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}>{cart.totalPrice}ugx</Text>
                </ItemPriceContainer>
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.darkGray}>{deliveryFeeTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}>{freeTextLabel}</Text>
                </ItemPriceContainer>
                <Divider />
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium * 1.2 : sizes.medium} fontWeight='normal' textColor={colors.darkGray}>{totalTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium * 1.2 : sizes.medium} fontWeight='bold' textColor={colors.darkGray}>{cart.totalPrice}ugx</Text>
                </ItemPriceContainer>
                <Button 
                    buttonText={confirmOrderTextLabel}
                    onPress={() => modalHandler('success')}
                    backgroundColor={colors.darkGray}
                    textColor={colors.white}
                    enabled  
                />
            </ScrollView>
            <RNModal visible={modal.visible} onRequestClose={closeModal}>
                { modal.type === 'momo' ? momoComponent() : 
                    modal.type === 'creditcard' ?
                    cardComponent() : orderConfirmComponent()
                }
            </RNModal>
        </Container>
    )
}

export default Checkout;