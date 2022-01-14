import React from 'react';
import { View, Switch, Platform } from 'react-native';
import styled from 'styled-components/native';

import Text from './text';
import {sizes} from '../../utils/config';

const Container = styled(View)`
    flexDirection: row;
    alignItems: center;
    paddingRight: ${sizes.small}px;
`

const SwitchComponent = (props) => {
    const {disabled, ios_backgroundColor, onValueChange, thumbColor, trackColor, value, switchText } = props;

    return (
        <Container>
            <Switch
                disabled={disabled}
                ios_backgroundColor={ios_backgroundColor}
                onValueChange={onValueChange}
                thumbColor={thumbColor}
                trackColor={trackColor}
                value={value}
                style={{ transform: [{ scaleX: Platform.OS === 'android' ? .8 : .5 }, { scaleY: Platform.OS === 'android' ? .8 : .5 }] }}
            />
            <Text variant='caption'>{switchText}</Text>
        </Container>
    )
}

export default SwitchComponent;