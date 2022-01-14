import React, {lazy, useState, useEffect} from 'react';
import { View, Image, StyleSheet, ScrollView,useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';

const Text = lazy(() => import('../../../reusable/text'));
const Button = lazy(() => import('../../../reusable/button'));

const HeaderContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-color: ${colors.gray};
    width: 90%;
`

const FavContainer = styled(View)`
    width: 100%;
    margin-top: ${sizes.small}px;
    margin-bottom: ${sizes.small}px;
    align-items: center;
`

const FavItemContainer = styled(TouchableOpacity)`
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const ImageContainer = styled(View)`
    height: ${Platform.OS === 'android' ? sizes.large * 2.5 : sizes.large * 2}px;
    width: 30%;
    border-radius: ${sizes.small}px;
    overflow: hidden;
`

const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
`

const FavContentContainer = styled(View)`
    padding-left: ${sizes.small}px;
    width: 70%;
    justify-content: space-between;
`

const FavTitleContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
`

const ButtonContainer = styled(View)`
    width: 45%;
`

const RateContainer = styled(View)`
    flex-direction: row;
    align-items: center;
`

const Divider = styled(View)`
    height: 1px;
    width: 90%;
    background-color: ${colors.lightGray};
    margin-top: ${sizes.small}px;
`

const foods = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}]

const Favs = (props) => {
    const {navigation} = props;
    const {height, width} = useWindowDimensions()

    // state
    const [fav, setFav] = useState('');

    const switchFav = (type) => {
        setFav(type);
    }

    // redux
    // remote configs
    const {
        values: { foodsTextLabel, chefsTextLabel, reOrderTextLabel, detailsTextLabel }
    } = useSelector(state => state.remoteConfigs);

    const favComponent = (id) =>
        <FavContainer key={id}>
            <FavItemContainer activeOpacity={.8} onPress={() => navigation.navigate('product')}>
                <ImageContainer>
                    <StyledImage source={images.placeholder} resizeMode='cover' />
                </ImageContainer>
                <FavContentContainer>
                    <FavTitleContainer>
                        <Text variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .85 : sizes.medium * .7} fontWeight='bold' textColor={colors.darkGray}>Cheese Burger</Text>
                        <Ionicons name='save' size={17} color={colors.darkGray} />
                    </FavTitleContainer>
                    <View style={{paddingBottom: sizes.small}}>
                        <Text variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .8 : sizes.medium * .7} fontWeight='normal' textColor={colors.lightGray}>Chef name</Text>
                    </View>
                    <FavTitleContainer>
                        <RateContainer>
                            <Ionicons name='star' size={13} color={colors.lightGray} />
                            <Text variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .7 : sizes.medium * .6} fontWeight='bold' textColor={colors.darkGray}>4.6</Text>
                        </RateContainer>
                        <RateContainer>
                            <Ionicons name='time-outline' size={13} color={colors.lightGray} />
                            <Text variant='custom' fontSize={Platform.OS === 'android' ? sizes.medium * .7 : sizes.medium * .6} fontWeight='bold' textColor={colors.darkGray}>15 mins</Text>
                        </RateContainer>
                        <Text variant='custom' fontSize={Platform.OS === "android" ? sizes.medium * .7 : sizes.medium * .6} fontWeight='bold' textColor={colors.black}>15,000ugx</Text>
                    </FavTitleContainer>
                </FavContentContainer>
            </FavItemContainer>
            <Divider />
        </FavContainer>

    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            <HeaderContainer>
                <ButtonContainer>
                    <Button 
                        buttonText={foodsTextLabel}
                        onPress={() => switchFav('foods')}
                        backgroundColor={fav === 'foods' ? colors.darkGray: colors.lightGray}
                        textColor={colors.white}
                        enabled  
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <Button 
                        buttonText={chefsTextLabel}
                        onPress={() => switchFav('chefs')}
                        backgroundColor={fav === 'chefs' ? colors.darkGray: colors.lightGray}
                        textColor={colors.white}
                        enabled  
                    />
                </ButtonContainer>
            </HeaderContainer>
            <ScrollView 
                bounces={false} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{paddingBottom: sizes.large * 1.85}}
            >
                {foods.map(({id}) => favComponent(id))}
            </ScrollView>
        </Container>
    )
}

export default Favs;