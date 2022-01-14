import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, sizes } from '../../utils/config';
import Text from './text';

const CountCountainer = styled(View)`
    height: ${sizes.medium}px;
    width: ${sizes.medium}px;
    border-radius: ${sizes.medium * .5}px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: ${colors.black};
    position: absolute;
    right: 0;
    top: -${sizes.small * .6}px;
    z-index: 9;
`

const Notifications = props => {
    const { count, onPress } = props;

    return (
        <View>
            <CountCountainer>
                <Text variant='custom' fontSize={sizes.medium * .65} fontWeight='normal' textColor={colors.white}>{count}</Text>
            </CountCountainer>
            <Ionicons name='notifications-outline' size={25} color={colors.gray} onPress={onPress} />
        </View>
    )
}

export default Notifications;