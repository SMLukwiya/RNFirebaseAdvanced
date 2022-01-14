import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {sizes} from '../../utils/config';
import Fallback from './fallback';

const SafeArea = styled(SafeAreaView)`
    flexGrow: 1;
    align-items: center;
`
/*marginTop: ${StatusBar.currentHeight ? `${StatusBar.currentHeight}px` : `${sizes.medium}px`}*/

const Container = (props) => {
    const {children, barStyle, barHidden, barTranslucent, bgColor} = props;

    return (
        <Suspense fallback={<Fallback />}>
            <StatusBar translucent={barTranslucent} barStyle={barStyle} hidden={barHidden} backgroundColor={bgColor} />
            <SafeArea edges={['bottom']}>
                {children}
            </SafeArea>
        </Suspense>
    )
}

Container.defaultProps = {
    barStyle: 'dark-content',
    barHidden: false,
    barTranslucent: true
}

export default Container;
