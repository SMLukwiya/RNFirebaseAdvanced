import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import {sizes, colors} from '../../utils/config';

// return a string with the desired styles
const title = () => `
    fontSize: ${sizes.large}px;
    color: ${colors.black};
    marginBottom: ${sizes.small}px;
`

const body = () => `
    fontSize: ${Platform.OS === 'android' ? sizes.medium * 1.5 : sizes.medium}px;
    color: ${colors.black};

`

const caption = () => `
    fontSize: ${Platform.OS === 'android' ? sizes.medium : sizes.medium * .75}px;
    color: ${colors.gray};
`

const error = () => `
    fontSize: ${Platform.OS === 'android' ? sizes.small * 1.5 : sizes.small * 1.15}px;
    color: ${colors.error};
    paddingLeft: ${sizes.small}px;
`

const menu = () => `
    fontSize: ${Platform.OS === 'android' ? sizes.medium : sizes.medium * .8}px;
    color: ${colors.black};
    paddingHorizontal: ${sizes.small}px;
`

const excerpt = () => `
    fontSize: ${Platform.OS === 'android' ? sizes.medium : sizes.medium * .8}px;
    color: ${colors.darkGray};
`

const custom = (fontSize, textColor, fontWeight) => `
    font-size: ${fontSize ? fontSize : sizes.medium}px;
    color: ${textColor ? textColor : colors.darkGray};
    font-weight: ${fontWeight};
`

const variants = {
    title, body, caption, error, menu, excerpt, custom
};

// get variant prop and call appropriate variant function to return styles
const StyledText = styled.Text`
    ${({variant, fontSize, textColor, fontWeight}) => variants[variant](fontSize, textColor, fontWeight)}
`

const Text = (props) => {
    const {fontSize, textColor, fontWeight, margin, variant, children} = props;

    return <StyledText variant={variant} fontSize={fontSize} textColor={textColor} fontWeight={fontWeight} margin={margin}>{children}</StyledText>;
}

StyledText.defaultProps = {
    variant: 'body'
}

export default Text;