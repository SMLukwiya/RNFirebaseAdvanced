import React, {lazy} from 'react';
import { View, Image, StyleSheet, ScrollView,useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';
import { removeFromCart, addQuantity, reduceQuanity } from '../../../../store/cart';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));

const android = Platform.OS === 'android';

const CartComponentContainer = styled(View)`
    flex-direction: row;
    border-radius: ${sizes. small}px;
    overflow: hidden;
    margin-top: ${sizes.small}px;
    margin-bottom: ${sizes.small}px;
    height: ${sizes.large * 3}px;
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

const QuantityContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:${sizes.small * .5}px;
    background-color: ${colors.lightGray};
    border-radius: ${sizes.small * .75}px;
    overflow: hidden;
    width: 34%;
`

const EmptyCartContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`

const Divider = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${colors.lightGray};
`

const PromoCodeContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${sizes.small}px;
    padding-bottom: ${sizes.small}px;
`

const ItemPriceContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${sizes.small}px;
    padding-bottom: ${sizes.small}px;
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

const Cart = (props) => {
    const dispatch = useDispatch();
    const { width, height } = useWindowDimensions();
    const {navigation} = props;

    // redux
    // cart
    const cart = useSelector(state => state.cart);
    // remote configs
    const {
        values: { 
            emptyCartTextLabel, backToShoppingTextLabel, addPromoCodeTextLabel, itemTotalTextLabel,
            discountTextLabel, deliveryFeeTextLabel, totalTextLabel, freeTextLabel, deliverToTextLabel, changeTextLabel,
            checkoutTextLabel
        }
    } = useSelector(state => state.remoteConfigs);

    // quantityHandler
    const quantityHandler = (type, data) => {
        if (type === 'add') {
            dispatch(addQuantity(data));
        } else {
            dispatch(reduceQuanity(data));
        }
    }

    // delete handler
    const deleteFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    // cart Items
    let cartItems = [];
    for (let key in cart.products) {
        cartItems.push(cart.products[key]);
    }

    const cartComponent = (id, name, unitPrice, price, quantity) => 
        <CartComponentContainer key={id}>
            <ImageContainer>
                <StyledImage resizeMode='cover' source={images.placeholder} />
            </ImageContainer>
            <CartContentContainer>
                <TitleContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.darkGray}>{name}</Text>
                    <Ionicons name='remove-circle' size={25} color={colors.error} onPress={() => deleteFromCart(id)} />
                </TitleContainer>
                <PriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .8} fontWeight='normal' textColor={colors.black}>{price}Ugx</Text>
                    <QuantityContainer>
                        <Ionicons name='remove-circle-outline' size={20} color={colors.black} onPress={() => quantityHandler('remove', {id, unitPrice})} />
                        <Text
                            variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.black}
                        >
                            {quantity}
                        </Text>
                        <Ionicons name='add-circle-outline' size={20} color={colors.black} onPress={() => quantityHandler('add', {id, unitPrice})} />
                    </QuantityContainer>
                </PriceContainer>
            </CartContentContainer>
        </CartComponentContainer>

    const emptyCartComponent = () => 
        <EmptyCartContainer>
            <Text  variant='custom' fontSize={android ? sizes.medium * 1.2 : sizes.medium} fontWeight='bold' textColor={colors.lightGray}>{emptyCartTextLabel}</Text>
            <Button 
                buttonText={backToShoppingTextLabel}
                onPress={() => navigation.navigate('home')}
                backgroundColor={colors.darkGray}
                textColor={colors.white}
                enabled  
            />
        </EmptyCartContainer>
    
    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            {cartItems.length === 0 ? emptyCartComponent() :
            <ScrollView 
                bounces={false} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{width: width * .85}}
            >
                {cartItems.map(({id,name,unitPrice,price, quantity}) => cartComponent(id,name,unitPrice,price, quantity ))}
                <Divider />
                <PromoCodeContainer activeOpacity={.8} onPress={() => {}}>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.darkGray}>{addPromoCodeTextLabel}</Text>
                    <Ionicons name='chevron-forward' size={20} color={colors.darkGray} />
                </PromoCodeContainer>
                <Divider />
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.lightGray}>{itemTotalTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{cart.totalPrice}ugx</Text>
                </ItemPriceContainer>
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.lightGray}>{discountTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{'1000'}ugx</Text>
                </ItemPriceContainer>
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{deliveryFeeTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{freeTextLabel}</Text>
                </ItemPriceContainer>
                <Divider />
                <ItemPriceContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium * 1.2 : sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{totalTextLabel}</Text>
                    <Text variant='custom' fontSize={android ? sizes.medium * 1.2 : sizes.medium * .8} fontWeight='bold' textColor={colors.gray}>{cart.totalPrice + cart.deliveryFee}ugx</Text>
                </ItemPriceContainer>
                <Divider />
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
                <Button 
                    buttonText={`${cart.totalPrice}ugx`}
                    onPress={() => navigation.navigate('checkout')}
                    backgroundColor={colors.darkGray}
                    textColor={colors.white}
                    enabled
                    leftComponent={<Text variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.white}>{checkoutTextLabel}</Text>}
                />
            </ScrollView>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    
})

export default Cart;