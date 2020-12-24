import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import Button from '../components/Button';

const AsignacionMesa = (props) => {

  const handleConfirmarAsignacion = () =>{
     props.handleConfirmarAsignacion();
  }

  return (
    <Background>
      <Header>Mesa Asginada</Header>
      <View>
        <TextInput
          label="Fecha"
          returnKeyType="next"
          style={{width: 340}}
          value={props.mesaAsig.fecha}
          disabled={true}
        />
        <TextInput
          label="N° de Mesa"
          returnKeyType="next"
          style={{width: 340}}
          value={props.mesaAsig.mesa.toString()}
          disabled={true}
        />
        <Button
          mode="contained"
          onPress={handleConfirmarAsignacion}
          style={styles.button}>
          Confirmar asignación
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 44,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default AsignacionMesa;
