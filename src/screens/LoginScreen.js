import React, {useState} from 'react';
import {connect} from 'react-redux';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import DropdownAlert from 'react-native-dropdownalert';
import {CommonActions} from '@react-navigation/native';
import {
  APIKit,
  emailValidator,
  passwordValidator,
  rutValidator,
} from '../core/utils';
import {getUsers} from '../redux/actions/usersActions';
import {storeData} from '../util/util';

const LoginScreen = ({navigation, props}) => {
  const [password, setPassword] = useState({value: '', error: ''});
  const [rut, setRut] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const _onLoginPressed = () => {
    console.log(props);
    setLoading(true);
    const rutError = rutValidator(rut.value);
    const passwordError = passwordValidator(password.value);

    if (rutError || passwordError) {
      setRut({...rut, error: rutError});
      setPassword({...password, error: passwordError});
      setLoading(false);
      return;
    }
    const json = JSON.stringify({
      rut: rut.value.split('-')[0],
      pwd: password.value,
    });

    APIKit.post('/Login/Logeo', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        if (data.data == null) {
          this.dropDownAlertRef.alertWithType(
            'error',
            'Error',
            'El rut y/o contraseña no esta correcto',
          );
          setLoading(false);
          return;
        } else {
          storeData(data.data,"keyUsuario").then(() => {
            navigation.navigate('Siglo XXI');
            storeData(null,'id_sesion');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Siglo XXI'}],
              }),
            );
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error',
          'Lo sentimos, ha ocurrido un error, por favor intente nuevamente mas tarde',
        );
        setLoading(false);
      });

    // console.log(this.props.url);
  };

  return (
    <>
      <View>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      </View>
      <Background>
        <Logo />

        <Header>Bienvenido.</Header>

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
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          disabled={loading}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={_onLoginPressed}
          loading={loading}
          disabled={loading}>
          Login
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>No tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
