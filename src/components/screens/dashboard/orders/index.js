import React, {lazy, useState, useEffect} from 'react';
import { View, Image, StyleSheet, ScrollView,useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));

const android = Platform.OS === 'android';

const HeaderContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${colors.gray};
    width: 90%;
`
const HeaderItem = styled(TouchableOpacity)`
    padding: ${sizes.small}px;
    width: 50%;
    align-items: center;
`

const OrderContainer = styled(View)`
    width: 100%;
    margin-top: ${sizes.small}px;
    margin-bottom: ${sizes.small}px;
    align-items: center;
`

const OrderItemContainer = styled(View)`
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ImageContainer = styled(View)`
    height: ${android ? sizes.large * 2.5 : sizes.large * 2}px;
    width: 30%;
    border-radius: ${sizes.small}px;
    overflow: hidden;
`

const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
`

const OrderContentContainer = styled(View)`
    padding: ${sizes.small}px;
    width: 70%;
`

const OrderTitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${sizes.small}px;
`

const ButtonContainer = styled(View)`
    width: 45%;
`

const items = [
    {
        date: '25 Dec 2021',
        orders: [{id: 1}, {id: 2}, {id: 3}]
    },
    {
        date: '24 Dec 2021',
        orders: [{id: 1}, {id: 2}, {id: 3}]
    },
]

const Orders = (props) => {
    const {} = props;

    // state
    const [order, setOrder] = useState('');

    const switchOrder = (type) => {
        setOrder(type);
    }

    // redux
    // remote configs
    const {
        values: { onComingTextLabel, prevOrdersTextLabel, reOrderTextLabel, detailsTextLabel }
    } = useSelector(state => state.remoteConfigs);

    const pastOrderComponent = (id) =>
        <OrderContainer key={id}>
            <OrderItemContainer>
                <ImageContainer>
                    <StyledImage source={images.placeholder} resizeMode='cover' />
                </ImageContainer>
                <OrderContentContainer>
                    <OrderTitleContainer>
                        <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .7} fontWeight='bold' textColor={colors.black}>Cheese Burger</Text>
                        <Text variant='custom' fontSize={android ? sizes.medium * .9 : sizes.medium * .7} fontWeight='bold' textColor={colors.black}>15,000ugx</Text>
                    </OrderTitleContainer>
                    <Text variant='custom' fontSize={android ? sizes.medium * .8 : sizes.medium * .6} fontWeight='normal' textColor={colors.gray}>25 Dec 2021, 11:30</Text>
                </OrderContentContainer>
            </OrderItemContainer>
            <OrderItemContainer>
                <ButtonContainer>
                    <Button 
                        buttonText={reOrderTextLabel}
                        onPress={() => {}}
                        backgroundColor={colors.darkGray}
                        textColor={colors.white}
                        enabled  
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <Button 
                        buttonText={detailsTextLabel}
                        onPress={() => {}}
                        backgroundColor={colors.darkGray}
                        textColor={colors.white}
                        enabled  
                    />
                </ButtonContainer>
            </OrderItemContainer>
        </OrderContainer>

    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            <HeaderContainer>
                <HeaderItem activeOpacity={.8} onPress={() => switchOrder('oncoming')}>
                    <Text 
                        variant='custom' fontSize={android ? sizes.medium * 1.15 : sizes.medium * .9} fontWeight='bold' textColor={order === 'oncoming' ? colors.black: colors.darkGray}
                    >
                        {onComingTextLabel}
                    </Text>
                </HeaderItem>
                <HeaderItem activeOpacity={.8} onPress={() => switchOrder('past')}>
                    <Text 
                        variant='custom' fontSize={android ? sizes.medium * 1.15 : sizes.medium * .9} fontWeight='bold' textColor={order === 'past' ? colors.black: colors.darkGray}
                    >
                        {prevOrdersTextLabel}
                    </Text>
                </HeaderItem>
            </HeaderContainer>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {items.map(({date, orders}) => 
                    <View key={date}>
                        <View style={{padding: sizes.small}}><Text variant='custom' fontSize={sizes.medium * .8} fontWeight='normal' textColor={colors.gray}>{date}</Text></View>
                        {orders.map(({id}) => pastOrderComponent(id))}
                    </View>
                )}
            </ScrollView>
        </Container>
    )
}

export default Orders;