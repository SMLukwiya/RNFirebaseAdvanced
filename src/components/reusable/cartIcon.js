import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, sizes } from '../../utils/config';

const Badge = styled(View)`
    background-color: ${colors.green};
    height: ${sizes.small}px;
    width: ${sizes.small}px;
    border-radius: ${sizes.small * .5}px;
    overflow: hidden;
    position: absolute;
    right: 0px;
    top: -1px;
`

const CartIcon = props => {
    const { count, onPress } = props;

    return (
        <View>
            {!!count && <Badge />}
            <Ionicons name='cart' size={25} color={colors.black} onPress={onPress} />
        </View>
    )
}

export default CartIcon;