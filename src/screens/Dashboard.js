import React, {memo, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {getData} from '../util/util';

const Dashboard = ({navigation}) => {
  useEffect(() => {
    getData("keyUsuario").then(console.log);
  }, []);

  return (
    <>
      <Background>
        <Logo />
        <Header>Bienvenido</Header>
        <Paragraph>Aplicacion restaurant sigloxii.</Paragraph>
        {/* <Button
          mode="outlined"
          onPress={() => navigation.navigate('HomeScreen')}>
          Logout
        </Button> */}
      </Background>
    </>
  );
};

export default Dashboard;
