import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator, passwordValidator, nameValidator, emptyValidator, APIKit} from '../core/utils';
import {ScrollView} from 'react-native-gesture-handler';
import { BackgroundScrollView } from '../components/Background';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [rut, setRut] = useState({value: '', error: ''});
  const [apellido, setApellido] = useState({value: '', error: ''});
  const [telefono, setTelefono] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const _onSignUpPressed = () => {
    setLoading(true);

    const nameError = emptyValidator(name.value);
    const emailError = emptyValidator(email.value);
    const passwordError = emptyValidator(password.value);
    const rutError = emptyValidator(rut.value);
    const apellidoError = emptyValidator(apellido.value);
    const telefonoError = emptyValidator(telefono.value);

    if (emailError || passwordError || nameError || rutError || apellidoError || telefonoError ) {
      setName({...name, error: `Nombre ${nameError}`});
      setEmail({...email, error: `Email ${emailError}`});
      setPassword({...password, error: `Password ${passwordError}`});
      setRut({...rut, error: `Rut ${rutError}`});
      setApellido({...apellido, error: `Apellido ${apellidoError}`});
      setTelefono({...telefono, error: `Telefono ${telefonoError}`});
      setLoading(false);
      return;
    }

    const json = JSON.stringify({
      rut: rut.value,
      pwd: password.value,
      nombre: name.value,
      appaterno : apellido.value, 
      rolId : 2 , 
      correo : email.value, 
      telefono : telefono.value
    });

    APIKit.post('/Login/CrearUsuarioTest', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      if (data.data == null) {
        setLoading(false);
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error',
          'El rut y/o contraseña no esta correcto',
        );
        
        return;
      } else {
        navigation.navigate('Login');        
      }
    }).catch(error =>{
      this.dropDownAlertRef.alertWithType(
        'error',
        'Error',
        'Lo sentimos, ha ocurrido un error, por favor intente nuevamente mas tarde',
      );
      setLoading(false);
    });

    
  };

  return (
    <BackgroundScrollView>
      <Logo />

      <Header>Crear Cuenta</Header>

      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
        disabled={loading}
      />

      <TextInput
        label="Apellido"
        returnKeyType="next"
        value={apellido.value}
        onChangeText={(text) => setApellido({value: text, error: ''})}
        error={!!apellido.error}
        errorText={apellido.error}
        disabled={loading}
      />

      <TextInput
        label="Rut"
        returnKeyType="next"
        value={rut.value}
        onChangeText={(text) => setRut({value: text, error: ''})}
        error={!!rut.error}
        errorText={rut.error}
        disabled={loading}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        disabled={loading}
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        disabled={loading}
        secureTextEntry
      />

      <TextInput
        label="Telefono"
        returnKeyType="next"
        value={telefono.value}
        onChangeText={(text) => setTelefono({value: text, error: ''})}
        error={!!telefono.error}
        errorText={telefono.error}
        disabled={loading}
      />

      <Button
        mode="contained"
        onPress={_onSignUpPressed}
        style={styles.button}
        loading={loading}
        disabled={loading}>
        Registrarse
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Tienes ya una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </BackgroundScrollView>
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
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
