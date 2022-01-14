import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import styled from 'styled-components/native';

import Text from '../reusable/text';
import { sizes, colors } from '../../utils/config';

const Container = styled(View)`
    width: 100%;
    marginTop: ${sizes.small * 1.25}px;
    marginBottom: ${sizes.small * 1.25}px;
`

const StyledInput = styled(TextInput)`
    width: 100%;
    padding: ${sizes.small * 1.25}px;
    borderRadius: ${sizes.medium}px;
    overflow: hidden;
    borderWidth: 1px;
    borderColor: ${colors.lightGray}
    fontSize: ${Platform.OS === 'android' ? sizes.medium * .9 : sizes.medium * .75}px;
    color: ${colors.black};
    background-color: ${({backgroundColor}) => backgroundColor ? backgroundColor : colors.white};
`

const Input = (props) => {
    const { placeholder, placeholderTextColor, onChangeText, autoCapitalize, autoCorrect, keyboardType, onBlur, secureTextEntry, value, error, backgroundColor, multiline } = props;

    return (
        <Container>
            <StyledInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                keyboardType={keyboardType}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                value={value}
                backgroundColor={backgroundColor}
                multiline={multiline}
            />
            {!!error && <Text variant='error'>{error}</Text>}
        </Container>
    )
}

StyledInput.defaultProps = {
    placeholderTextColor: colors.gray,
    autoCapitalize: 'none',
    autoCorrect: false,
    secureTextEntry: false
}

export default Input;