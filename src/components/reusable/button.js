import React from 'react';
import { TouchableOpacity, Text, Platform } from 'react-native';
import styled from 'styled-components/native';

import { colors, sizes } from '../../utils/config';

const Container = styled(TouchableOpacity)`
    backgroundColor: ${props => props.bgColor};
    width: 100%;
    alignItems: center;
    justifyContent: ${({rightComponent}) => rightComponent ? 'space-between' : 'center'};
    borderRadius: ${sizes.small}px;
    marginTop: ${sizes.small}px;
    marginBottom: ${sizes.small}px;
    flex-direction: ${({leftComponent, rightComponent}) => leftComponent || rightComponent ? 'row' : 'column'};
    align-items: center;
    paddingLeft: ${sizes.small}px;
    paddingRight: ${sizes.small}px;
`

const ButtonText = styled(Text)`
    padding: ${Platform.OS === 'android' ? sizes.small * 1.5 : sizes.small}px;
    font-size: ${Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .8}px;
    color: ${props => props.textColor};
`

const Button = (props) => {
    const {leftComponent, buttonText, onPress, backgroundColor, textColor, enabled, rightComponent} = props;

    return (
        <Container 
            activeOpacity={.8} 
            onPress={enabled ? onPress: () => {}} 
            bgColor={backgroundColor} 
            leftComponent={leftComponent} rightComponent={rightComponent}
        >
            {leftComponent && leftComponent}
            <ButtonText textColor={textColor}>{buttonText}</ButtonText>
            {rightComponent && rightComponent}
        </Container>
    )
}

Container.defaultProps = {
    padding: `${sizes.medium}px`,
}

ButtonText.defaultProps = {
    textColor: colors.white
}

export default Button;