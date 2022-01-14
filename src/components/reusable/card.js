import React from 'react';
import { TouchableOpacity, View, Image, Text as RNText, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { sizes, colors } from '../../utils/config';
import Text from './text';

const Container = styled(TouchableOpacity)`
    borderRadius: ${sizes.medium}px;
    overflow: hidden;
    height: ${Platform.OS === 'android' ? sizes.large * 8 : sizes.large * 6}px;
    width:  ${Platform.OS === 'android' ? sizes.large * 10 : sizes.large * 8}px;
    marginTop: ${sizes.small}px;
    backgroundColor: ${colors.lightGray};
    paddingBottom: ${sizes.small * 1.5}px;
    margin: ${sizes.small}px;
`

const ImageContainer = styled(View)`
    height: 65%;
    width: 100%;
`

const StyledImage = styled(Image)`
    width: 100%;
    height: 100%;
`

const ContentContainer = styled(View)`
    width: 100%;
    height: 35%;
    padding-right: ${sizes.small}px;
    padding-left: ${sizes.small}px;
    padding-bottom: ${sizes.small}px;
    padding-top: ${sizes.small * .5}px;
`

const RateContainer = styled(View)`
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
    paddingLeft: ${sizes.small * .25    }px;
`

const StarContainer = styled(View)`
    flexDirection: row;
    alignItems: center;
`

const Time = styled(RNText)`
    backgroundColor: ${colors.darkGray};
    borderRadius: ${sizes.small}px;
    overflow: hidden;
    padding: ${sizes.small * .25}px;
    fontSize: ${sizes.medium * .75}px;
`

// 
const ChefContainer = styled(TouchableOpacity)`
    flexDirection: row;
    borderRadius: ${sizes.medium}px;
    overflow: hidden;
    height: ${sizes.large * 3}px;
    width:  ${({width}) => width ? width : sizes.large * 8}px;
    marginTop: ${sizes.small}px;
    backgroundColor: ${colors.lightGray};
    margin: ${sizes.small}px;
`

const ChefImageContainer = styled(View)`
    height: 100%;
    width: 35%;
`

const ChefContentContainer = styled(View)`
    width: 65%;
    height: 100%;
    padding-right: ${sizes.small}px;
    padding-left: ${sizes.small}px;
    padding-bottom: ${sizes.small * .5}px;
    padding-top: ${sizes.small * .5}px;
    justifyContent: space-around;
`

const Card = (props) => {
    const {image, title, excerpt, rate, time, chef, width} = props;

    if (chef) {
        return (
            <ChefContainer activeOpacity={.8} onPress={() => {}} width={width}>
                <ChefImageContainer>
                    <StyledImage source={image} resizeMode='cover' />
                </ChefImageContainer>
                <ChefContentContainer>
                    <Text variant='menu'>{title}</Text>
                    <Text variant='excerpt'>{excerpt}</Text>
                    <RateContainer>
                        <StarContainer>
                            <Ionicons name='star' size={18} color={colors.yellow} />
                            <Text variant='menu'>{rate}</Text>
                        </StarContainer>
                        <Time>{time}</Time>  
                    </RateContainer>
                </ChefContentContainer>
            </ChefContainer>
        )
    }

    return (
        <Container activeOpacity={.8} onPress={() => {}}>
            <ImageContainer>
                <StyledImage source={image} resizeMode='cover' />
            </ImageContainer>
            <ContentContainer>
                <Text variant='menu'>{title}</Text>
                <Text variant='excerpt'>{excerpt}</Text>
                <RateContainer>
                    <StarContainer>
                        <Ionicons name='star' size={18} color={colors.yellow} />
                        <Text variant='menu'>{rate}</Text>
                    </StarContainer>
                    <Time>{time}</Time>  
                </RateContainer>
            </ContentContainer>
        </Container>
    )
}

export default Card;