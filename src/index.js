import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import { useDispatch } from 'react-redux';

import {updateConfigs} from './store/remoteConfig';
import { resetLoaders } from './store/user';
import variables from './utils/variables.json';

import RootNavigator from './routes';

const App = () => {
    const dispatch = useDispatch();

    const fetchConfigs = () => {
        remoteConfig()
            .setDefaults(variables)
            .then(() => remoteConfig().fetchAndActivate())
            .then(fetched => {
                if (!fetched) 
                    return dispatch(updateConfigs(variables));

                return remoteConfig().getAll();
            })
            .then(values => {
                let object = {};
                Object.entries(values).forEach(([key, value]) => {
                    object[key] = value.asString();
                })

                dispatch(updateConfigs(object))
            })
            .catch(err => {
                console.log(err);
                dispatch(updateConfigs(variables));
            })
    }
    
    useEffect(() => {
        dispatch(resetLoaders());
        fetchConfigs();
    },[])

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default App;