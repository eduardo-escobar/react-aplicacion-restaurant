import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default  Background = ({ children }) => (
  <ImageBackground
    source={require('../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

export const  BackgroundScrollView = ({ children }) => (
    <ScrollView contentContainerStyle={styles.containerScroll} behavior="padding">
      {children}
    </ScrollView>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerScroll: {
    padding: 10,
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

//export default memo(Background);
