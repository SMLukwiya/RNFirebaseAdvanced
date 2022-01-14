import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors, sizes } from '../../utils/config';

const Container = styled(View)`
    borderWith: 1px;
    borderColors: ${colors.gray};
    borderRadius: ${sizes.small}px;
    backgroundColor: ${colors.white};
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
`

const Search = (props) => {
    const { onChangeText, onBlur, value } = props;

    return (
        <Container>
            <TextInput
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={true}
                keyboardType="default"
                onChangeText={onChangeText}
                placeholder="Search"
                placeholderTextColor={colors.black}
                style={{
                    padding: sizes.small
                }}
                onBlur={onBlur}
                value={value}
            />
            <Ionicons name='search-circle' size={Platform.OS === 'android' ? 35 : 25} color={colors.black} />
        </Container>
    )
}

export default Search;