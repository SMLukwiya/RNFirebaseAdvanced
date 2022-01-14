import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import { colors, sizes } from '../../utils/config';
import Text from './text';

const HeaderIcon = styled(Ionicons)`
    marginLeft: ${sizes.small}px
`

const Container = styled.View`
    margin: ${sizes.small}px;
`

const HeaderLeft = (props) => {
    const {onPress, icon, text} = props;

    if (icon) 
        return (
            <HeaderIcon name='chevron-back' size={25} color={colors.black} onPress={onPress} />
        )

    return (
        <Container>
            <Text variant='body'>{text}</Text>
        </Container>
    )
}

export default HeaderLeft;
