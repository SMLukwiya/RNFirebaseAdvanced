import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { colors } from '../../utils/config';

const Container = styled(View)`
    flex: 1;
    alignItems: center;
    justifyContent: center;
`

export default SuspenseFallback = () => <Container><ActivityIndicator color={colors.blue} size='large' /></Container>