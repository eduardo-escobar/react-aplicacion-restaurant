import React, {memo, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import BackgroundScrollView from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  emptyValidator,
} from '../core/utils';
import {ScrollView} from 'react-native-gesture-handler';
import {getData} from '../util/util';
import { CommonActions } from '@react-navigation/native';

const UsuarioInfoScreen = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [rut, setRut] = useState({value: 0, error: ''});
  const [apellido, setApellido] = useState({value: '', error: ''});
  const [telefono, setTelefono] = useState({value: 0, error: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('keyUsuario').then(
      ({_nombre, _appaterno, _correo, _apmaterno, _rut, _telefono}) => {
        setName({value: _nombre, error: ''});
        setEmail({value: _correo, error: ''});
        setRut({value: _rut, error: ''});
        setApellido({value: `${_appaterno} ${_apmaterno}`, error: ''});
        setTelefono({value: _telefono, error: ''});
      },
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Header>Usuario</Header>
      <List.Section>
        <List.Subheader>Información: </List.Subheader>
        <List.Item
          title={`${name.value} ${apellido.value}`}
          left={() => <List.Icon icon="folder" />}
        />
        <List.Item
          title={rut.value}
          left={() => <List.Icon color="#000" icon="folder" />}
        />
        <List.Item
          title={email.value}
          left={() => <List.Icon color="#000" icon="folder" />}
        />
        <List.Item
          title={telefono.value}
          left={() => <List.Icon color="#000" icon="folder" />}
        />
      </List.Section>

      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate('Home');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Home'}],
            }),
          );
        }}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  containerScroll: {
    padding: 20,
    width: '100%',
    maxWidth: 340,
  },
});

export default UsuarioInfoScreen;
