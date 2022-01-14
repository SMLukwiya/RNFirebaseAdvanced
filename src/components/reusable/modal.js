import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, sizes } from '../../utils/config';

//
const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.75);
`

const IconContainer = styled(TouchableOpacity)`
    height: ${sizes.medium * 2.5}px;
    width: ${sizes.medium * 2.5}px;
    border-radius: ${(sizes.medium * 2.5)/2}px;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    overflow: hidden;
`

const RnModal = (props) => {
    const { visible, onRequestClose, children } = props;

    return (
        <Modal
            animationType='fade'
            onRequestClose={onRequestClose}
            presentationStyle='overFullScreen'
            transparent
            visible={visible}
        >
            <Container>
                <IconContainer activeOpacity={.8} onPress={onRequestClose}>
                    <Ionicons name='close' color={colors.black} size={20} />
                </IconContainer>
                {children}
            </Container>
        </Modal>
    )
}

export default RnModal;