/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider, Text} from 'react-native-paper';
import store from './src/redux/store'
import { theme } from './src/core/theme';
import App from './src';

const Main: () => React$Node = () => {
  return (
    <>
    <PaperProvider store={store} theme={theme}>
        <App/>
    </PaperProvider>
    </>
  );
};

export default Main;
