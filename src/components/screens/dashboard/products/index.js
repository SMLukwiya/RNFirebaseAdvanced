import React, {lazy} from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import Container from '../../../reusable/container';
import { sizes, colors, images } from '../../../../utils/config';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const Text = lazy(() => import('../../../reusable/text'));

const android = Platform.OS === 'android';

const MenuItemContainer = styled(TouchableOpacity)`
    flex-direction: row;
    width: 90%;
    height: ${android ? sizes.large * 3.5 : sizes.large * 3}px;
    border-radius: ${sizes.medium}px;
    overflow: hidden;
    marginTop: ${sizes.medium}px;
`

const ImageContainer = styled(View)`
    height: 100%;
    width: 30%;
`

const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
`

const ContentContainer = styled(View)`
    height: 100%;
    width: 70%;
    padding: ${sizes.small}px;
    justify-content: space-between;
`

const TitleContainer = styled(View)`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

const RateContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const data = [
    {id: 1}, {id: 2}, {id: 3},{id: 4}, {id: 5}, {id: 6},{id: 7}, {id: 8}, {id: 9},
]

const Products = (props) => {
    const {navigation} = props;
    const { width } = useWindowDimensions()
    
    // store
    const menuComponent = (id, name, chef, deliveryTime, rating) =>
        <MenuItemContainer activeOpacity={.8} onPress={() => navigation.navigate('product', {productId: id})}>
            <ImageContainer>
                <StyledImage source={images.placeholder} resizeMode='cover' />
            </ImageContainer>
            <ContentContainer>
                <TitleContainer>
                    <Text 
                        variant='custom' fontSize={android ? sizes.small * 1.8 : sizes.small * 1.4} fontWeight='bold' textColor={colors.black}
                    >
                        {'Pasta Bernadin'}
                    </Text>
                    <RateContainer>
                        <Ionicons name='star' size={15} color={colors.yellow} />
                        <Text 
                            variant='custom' fontSize={android ? sizes.small * 1.8 : sizes.small * 1.5} fontWeight='bold' textColor={colors.gray}
                        >
                            {4.6}
                        </Text>
                    </RateContainer>
                </TitleContainer>
                <Text 
                    variant='custom' fontSize={android ? sizes.small * 1.5 : sizes.small * 1.25} fontWeight='normal' textColor={colors.black}
                >
                    {'Chef Bisaaso, Wandegeya corner'}
                </Text>
                <Text
                    variant='custom' fontSize={android ? sizes.small * 1.5 : sizes.small * 1.25} fontWeight='bold' textColor={colors.darkGray}
                >
                    {'45 min delivery'}
                </Text>
            </ContentContainer>
        </MenuItemContainer>

    return (
        <Container
            bgColor='transparent'
            barTranslucent={true}
            barStyle='dark-content'
        >
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => menuComponent()}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={[styles.listContainer, {width: width * .9}]}
            />   
        </Container>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flexGrow: 1,
        marginLeft: '10%'
    }
});

export default Products;