import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';
import Background, {BackgroundScrollView} from '../components/Background';
import TextInput from '../components/TextInput';
import InputSpinner from 'react-native-input-spinner';
import {getData} from '../util/util';
import {LogBox} from 'react-native';
import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {APIKit} from '../core/utils';
import { ModalDate } from './helper/ModalDate';
LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const GestionReserva = (props) => {
  const [rut, setRut] = useState({value: 0, error: ''});
  const [name, setName] = useState({value: '', error: ''});
  const [cantidad, setCantidad] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const isFocused = useIsFocused();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('datetime');

  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    if (isFocused) {
      getData('keyUsuario').then(
        ({_nombre, _appaterno, _correo, _apmaterno, _rut, _telefono}) => {
          console.log('LLego rut: ' + _rut);
          setRut({value: _rut, error: ''});
        },
      );
    }
  }, [isFocused]);

  const hideModal = ()=>{
    setShow(Platform.OS === 'ios');
  }

  const handleConfirmDate = (fecha) =>{
    console.log('Fecha en el handlet: '+ fecha);
    setDate(fecha);
    console.log(`Fecha de date : ${fecha.getHours()}:${fecha.getMinutes()}`);
    const selectedTime = date.getTime() || new Date();
    
    setTime(new Date(selectedTime));
    console.log('Tiempo: '+ time);
    setShow(Platform.OS === 'ios');
  }

  const onChange = (event, selectedValue) => {
    console.log('que pasa ', event)
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      if (event.type == 'dismissed') {
        setShow(Platform.OS === 'ios');
        return;
      }
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else {
      if (event.type == 'dismissed') {
        setMode('date');
        setShow(Platform.OS === 'ios');
        return;
      }
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };

  const handleAddReserva = () => {
    setLoading(true);

    const json = JSON.stringify({
      usuario_rut: rut.value,
      nombre: name.value,
      fecha: formatDatePost(date),
      cantidad_comensales: cantidad,
    });

    console.log(`Se envia para la reserva: ${json}`);

    APIKit.post('/Aplicacion/Reservar', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        if (data.data == null) {
          this.dropDownAlertRef.alertWithType(
            'error',
            'Error',
            'No se ecuenta disponible ninguna mesa',
          );
          setLoading(false);
          return;
        } else {
          console.log('Data entregada: ' + data.data);
          const {fecha, mesa_id_mesa,id_reserva} = data.data;          
          setLoading(false);
          props.handleReserva({fecha: fecha, mesa: mesa_id_mesa, idReserva : id_reserva});
          return;
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
  };

  const showDatepicker = () => {
    setMode('date');
    setShow(Platform.OS !== 'ios');
  };
  const formatDate = (date, time) => {
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  const formatDatePost = (date) => {
    return `${date.getFullYear()} /${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <BackgroundScrollView style={{marginButtom: 15}}>
      <Header>Reserva</Header>

      {/* <TextInput
        label="Usuario reserva"
        returnKeyType="next"
        value={rut.value}
        onChangeText={(text) => setRut({value: text, error: ''})}
        error={!!rut.error}
        errorText={rut.error}
        disabled={false}
      /> */}
      <TextInput
        label="Nombre comensal para reserva"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
        disabled={loading}
      />
      <View style={styles.container}>
        <Text style={styles.modalQuantityText}>Cantidad de Comensales</Text>
        <InputSpinner
          max={20}
          min={1}
          step={1}
          width={200}
          height={40}
          value={1}
          onChange={(value) => {
            setCantidad(value);
          }}
          rounded={false}
          showBorder={true}
          activeOpacity={0.7}
          color={'#9D8AD0'}
        />

        {show && (
          // <DateTimePicker
          //   testID="dateTimePicker"
          //   timeZoneOffsetInMinutes={-3 * 60}
          //   value={date}
          //   locale = 'es-CL'
          //   mode={mode}
          //   is24Hour={true}
          //   display="default"
          //   onChange={onChange}
          // />
          <ModalDate setShow={setShow} mode={mode} date={date} hideModal={hideModal} handleConfirmDate={handleConfirmDate}/>
          
        )}

        <TouchableOpacity onPress={showDatepicker} style={{width: 300}}>
          <TextInput
            style={{width: 390}}
            label="Fecha de Reserva"
            disabled={true}
            value={formatDate(date, time)}></TextInput>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={handleAddReserva}
        style={styles.button}
        loading={loading}
        disabled={loading}>
        Confirmar
      </Button>
    </BackgroundScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  modalQuantityText: {
    fontSize: 15,
    paddingStart: 5,
    paddingBottom: 10,
    textAlign: 'left',
    color: 'rgba(90,90,90,1)',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    marginTop: 44,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    color: 'rgba(90,90,90,1)',
    textAlign: 'left',
    color: 'rgba(90,90,90,1)',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default GestionReserva;
