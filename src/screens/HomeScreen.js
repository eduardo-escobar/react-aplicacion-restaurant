import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { APIKit } from '../core/utils';
import { Image } from 'react-native';

const HomeScreen = ({navigation}) => {

  return (
    <Background>
      <Logo />
      <Header>Restaurant SigloXII</Header>

      <Paragraph>El mejor servicio, para el mejor consumidor.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Registro')}>
        Regístrate
      </Button>
    </Background>
  );
};

export default HomeScreen;
