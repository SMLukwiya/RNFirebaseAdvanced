import React, {lazy, useEffect, useState} from 'react';
import { View, Image, Text as RNText, useWindowDimensions, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';
import { addToCart } from '../../../../store/cart';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));
const RNModal = lazy(() => import('../../../reusable/modal'));
const Input = lazy(() => import('../../../reusable/input'));

const ImageContainer = styled(View)`
    width: 100%;
    height: ${({height}) => height * .3 || sizes.large * 4}px;
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`
const TitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
    paddingTop: ${sizes.small}px;
`

const RateContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between
`

const DetailTitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    paddingTop: ${sizes.small}px;
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
`

const Divider = styled(View)`
    height: 1px;
    width: 100%;
    background-color: ${colors.lightGray};
    marginTop: ${sizes.medium * .7}px;
`

const DetailsContainer = styled(View)`
    paddingTop: ${sizes.small}px;
`

const ProductCustomizationRule = styled(RNText)`
    padding: ${sizes.small}px;
    background-color: ${colors.lightGray};
    color: ${colors.black};
    font-size: ${Platform.OS === 'android' ? sizes.small * 1.5 : sizes.small}px;
    border-radius: ${sizes.small * .75}px;
    overflow: hidden;
`

const IngredientContainer = styled(View)`
    paddingLeft: ${sizes.small}px;
    marginTop: ${sizes.small}px;
`

const IngredientItem = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
`

const Select = styled(Ionicons)`
    paddingRight: ${sizes.small}px;
`

const ButtonContainer = styled(View)`
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
    paddingTop: ${sizes.small * 1.5}px;
`

const InstructionContainer = styled(View)`
    background-color: ${colors.lightGray};
    border-radius: ${sizes.small * .75}px;
    padding: ${sizes.small}px;
`

const ProductItemContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
`

const QuantityContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:${ Platform.OS === 'android' ? sizes.small * .9 : sizes.small * .5}px;
    background-color: ${colors.lightGray};
    border-radius: ${sizes.small * .75}px;
    overflow: hidden;
    width: 34%;
`

const CartButtonContainer = styled(View)`
    width: 64%;
`

const InputContainer = styled(View)`
    width: 80%;
`

const product = {
    id: 'product1',
    name: 'Chicken Burger',
    unitPrice: 15000,
    rate: 4.9,
    deliveryTime: '30 mins',
    deliveryFee: 'Free delivery',
    ingredients: [{id: 'sauce', name: 'Extra Savary Sauce'}, {id: 'cheese', name: 'Extra Cheese'} , {id: 'letuse', name: "Extra Letuse"}],
    detailInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut laoreet elit. In eget accumsan est, at efficitur magna. Morbi tempus, libero sed congue varius, tellus magna tristique ex, at fermentum neque nisi sed lacus. Proin tincidunt leo at augue mollis cursus. Suspendisse posuere in tortor vitae gravida. Nulla commodo velit a nulla auctor'
}

const Product = props => {
    const dispatch = useDispatch();
    const {} = props;
    const {width, height} = useWindowDimensions();
    let android = Platform.OS === 'android';

    // state
    const [details, setDetails] = useState('details');
    const [choices, setChoices] = useState([]);
    const [productDetails, setProductDetails] = useState({ quantity: 1, amount: product.unitPrice, specialInstruction: ''})
    const [modal, setModal] = useState(false)

    // redux
    const {
        values: {
            detailsTextLabel, ingredientsTextLabel, reviewTextLabel, addSpecialInstructionsTextLabel, addToCartTextLabel,
            saveTextLabel
        }
    } = useSelector(state => state.remoteConfigs) 

    // set details handler
    const switchDetailsInfoHandler = (detail) => {
        setDetails(detail);
    }

    // choices handler
    const choicesHandler = (id) => {
        choices.indexOf(id) !== -1 ? setChoices(choices.filter(itemId => itemId !== id)) : setChoices(choices.concat(id));
    }

    // modal handler
    const switchModal = () => {
        setModal(prevState => !prevState);
        setProductDetails({
            ...productDetails, specialInstruction: ''
        })
    }

    // special instructions
    const onChangeText = (e) => setProductDetails({...productDetails, specialInstruction: e});

    // save special instructions
    const saveInstructionHandler = () => setModal(prevState => !prevState);

    // adjust quantity and price
    const quantityHandler = (type) => {
        type === 'add' ? 
            setProductDetails({
                ...productDetails, 
                quantity: productDetails.quantity + 1
            })
        :
            setProductDetails({
                ...productDetails, 
                quantity: productDetails.quantity > 1 ? productDetails.quantity - 1 : productDetails.quantity
            })
    }

    // add to cart handler
    const addToCartHandler = () => {
        dispatch(addToCart({
            ...product, 
            quantity: productDetails.quantity,
            price: productDetails.amount,
            instructions: productDetails.specialInstruction
        }))
    }

    // adjust amount
    useEffect(() => {
        setProductDetails({...productDetails, amount: productDetails.quantity * product.unitPrice})
    }, [productDetails.quantity])

    // product details component
    const detailsComponent = () => 
        <Text
            variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .8} fontWeight='normal' textColor={colors.darkGray}
        >
            {product.detailInfo}
        </Text>

    // product ingredient component
    const ingredientsComponent = () =>
        <View>
            <DetailTitleContainer>
                <Text
                  variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}  
                >
                    {"Choice of toppings"}
                </Text>
                <ProductCustomizationRule>{'Required'}</ProductCustomizationRule>
            </DetailTitleContainer>
            <IngredientContainer>
                {product.ingredients.map(({id, name}) => 
                    <IngredientItem key={id} activeOpacity={.8} onPress={() => choicesHandler(id)}>
                        <Select name={choices.indexOf(id) === -1 ? 'checkmark-circle-outline' : 'checkmark-circle'} style={{}} color={colors.darkGray} size={20} />
                        <Text
                            variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.black}
                        >
                            {name}
                        </Text>
                    </IngredientItem>
                )}
            </IngredientContainer>
            <ButtonContainer>
                <Button
                    buttonText={addSpecialInstructionsTextLabel}
                    onPress={switchModal}
                    backgroundColor={colors.lightGray}
                    textColor={colors.black}
                    enabled
                    leftComponent={<Ionicons name='add-circle-outline' size={25} color={colors.black} />}
                />
                {!!productDetails.specialInstruction && 
                    <InstructionContainer>
                        <Text 
                            variant='custom' fontSize={android ? sizes.medium : sizes.medium * .8} fontWeight='normal' textColor={colors.black}
                        >
                            - {productDetails.specialInstruction}
                        </Text>
                    </InstructionContainer>
                }
            </ButtonContainer>
            <ProductItemContainer>
                <QuantityContainer>
                    <Ionicons name='remove-circle-outline' size={25} color={colors.black} onPress={() => quantityHandler('remove')} />
                    <Text
                        variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.black}
                    >
                        {productDetails. quantity}
                    </Text>
                    <Ionicons name='add-circle-outline' size={25} color={colors.black} onPress={() => quantityHandler('add')} />
                </QuantityContainer>
                <CartButtonContainer>
                    <Button 
                        buttonText={addToCartTextLabel}
                        onPress={addToCartHandler}
                        backgroundColor={colors.gray}
                        textColor={colors.white}
                        enabled
                        rightComponent={<Text variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.white}>{productDetails.amount}Ugx</Text>}
                    />
                </CartButtonContainer>
            </ProductItemContainer>
        </View>

    return (
        <Container>
            <ImageContainer height={height}>
                <StyledImage source={images.placeholder} resizeMode='cover' />
            </ImageContainer>
            <View style={{width}}>
                <TitleContainer>
                    <Text
                        variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}
                    >
                        {'Chicken Burger'}
                    </Text>
                    <Text
                        variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium : sizes.medium * .8} fontWeight='bold' textColor={colors.black}
                    >
                        {'15,000ugx'}
                    </Text>
                </TitleContainer>
                <TitleContainer>
                    <RateContainer>
                        <Ionicons name='star' size={15} color={colors.yellow} />
                        <Text
                            variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .75} fontWeight='bold' textColor={colors.darkGray}
                        >
                            {4.9}
                        </Text>
                        <Text
                            variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .75} fontWeight='normal' textColor={colors.gray}
                        >
                            {'(150)'}
                        </Text>
                    </RateContainer>
                    <RateContainer>
                        <Ionicons name='time-outline' size={15} color={colors.darkGray} />
                        <Text
                            variant='custom' fontSize={sizes.medium * .75} fontWeight='normal' textColor={colors.darkGray}
                        >
                            {'30 mins'}
                        </Text>
                    </RateContainer>
                    <RateContainer>
                        <Ionicons name='cash-outline' size={15} color={colors.darkGray} />
                        <Text
                            variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .85 : sizes.medium * .7} fontWeight='normal' textColor={colors.darkGray}
                        >{'Free delivery'}</Text>
                    </RateContainer>
                </TitleContainer>
            </View>
            <ScrollView 
                bounces={false} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.container, {width, height}]}>
                
                <Divider />
                <DetailTitleContainer>
                    <TouchableOpacity activeOpacity={.8} onPress={() => switchDetailsInfoHandler('details')}>
                        <Text
                            variant='custom' 
                            fontSize={details === 'details' ? (Platform.OS === 'android' ? sizes.medium * 1.1 : sizes.medium * .8) : (Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .7)}
                            fontWeight={details === 'details' ? 'bold' : 'normal'}
                            textColor={details === 'details' ? colors.black : colors.darkGray}
                        >
                            {detailsTextLabel}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={() => switchDetailsInfoHandler('ingredients')}>
                        <Text
                            variant='custom' 
                            fontSize={details === 'ingredients' ? (Platform.OS === 'android' ? sizes.medium * 1.1 : sizes.medium * .8) : (Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .7)}
                            fontWeight={details === 'ingredients' ? 'bold' : 'normal'}
                            textColor={details === 'ingredients' ? colors.black : colors.darkGray}
                        >
                            {ingredientsTextLabel}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.8} onPress={() => switchDetailsInfoHandler('reviews')}>
                        <Text
                            variant='custom'
                            fontSize={details === 'reviews' ? (Platform.OS === 'android' ? sizes.medium * 1.1 : sizes.medium * .8) : (Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .7)}
                            fontWeight={details === 'reviews' ? 'bold' : 'normal'}
                            textColor={details === 'reviews' ? colors.black : colors.darkGray}
                        >
                            {reviewTextLabel}
                        </Text>
                    </TouchableOpacity>
                </DetailTitleContainer>
                <DetailsContainer>
                    {details === 'details' && detailsComponent()}
                    {details === 'ingredients' && ingredientsComponent()}
                </DetailsContainer>
            </ScrollView>
            {/* Modal */}
            <RNModal visible={modal} onRequestClose={switchModal}>
                <InputContainer>
                    <Input 
                        placeholder={'Add special instruction for Item'} 
                        placeholderTextColor={colors.gray} onChangeText={onChangeText}
                        autoCorrect={true}
                        keyboardType='default' 
                        onBlur={()=>{}} 
                        value={productDetails.specialInstruction}
                        multiline={true}
                    />
                    <Button
                        buttonText={saveTextLabel}
                        onPress={saveInstructionHandler}
                        backgroundColor={colors.gray}
                        textColor={colors.white}
                        enabled
                     />
                </InputContainer>
            </RNModal>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: sizes.small
    }
})

export default Product;