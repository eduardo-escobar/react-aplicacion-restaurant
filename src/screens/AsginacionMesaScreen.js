import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {getData, storeData} from '../util/util';
import AsignacionMesa from './AsignacionMesaForm';
import {APIKit} from '../core/utils';
import {BackgroundScrollView} from '../components/Background';
import Paragraph from '../components/Paragraph';

export const AsginacionMesaScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [existeMesaAsignada, setExisteMesaAsignada] = useState(false);
  const [mesaAsignada, setMesaAsignada] = useState({});

  const handleConfirmarAsignacion = () => {
    navigation.navigate('Orden');
    storeData([], 'arrayBasket');
    storeData(0, 'idOrden');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Orden'}],
      }),
    );
  };
  useEffect(() => {
    if (isFocused) {
      try {
        getData('id_sesion').then((v) => {
          console.log('Existe mesa asignada: ' + v);
          if (v == null) {
            getData('keyUsuario').then((v) => {
              console.log(v._rut);
              APIKit.get('/Aplicacion/ObtenerMesaAsignada/' + v._rut).then(
                (data) => {
                  if (data.data == null) {
                    setExisteMesaAsignada(false);
                    setLoading(false);
                    return;
                  } else {
                    console.log('Data entregada: ' + JSON.stringify(data.data));
                    const {id_sesion, fecha, mesa_id_mesa} = data.data;
                    console.log('IdSesion: ' + id_sesion);

                    storeData(`${id_sesion}`,'id_sesion').then(() => {
                      setMesaAsignada({fecha: fecha, mesa: mesa_id_mesa});
                      setExisteMesaAsignada(true);
                      setLoading(false);
                    }).catch(error =>{
                      throw error;
                    });
                  }
                },
              ).catch(error =>{
                throw error;
              });
            });
          }
        });
      } catch (error) {
        console.log(error);
        this.dropDownAlertRef.alertWithType(
          'error',
          'Error',
          'Lo sentimos, ha ocurrido un error, por favor informar a administración',
        );
        setLoading(false);
      }
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>

      {existeMesaAsignada ? (
        <AsignacionMesa mesaAsig={mesaAsignada} handleConfirmarAsignacion={handleConfirmarAsignacion}/>
      ) : (
        <View
        style={{
          justifyContent: 'center',
          height: '100%',
        }}>
        <Paragraph>No se ha asignado aún a una mesa</Paragraph>
      </View>
      )}
    </View>
  );
}; 
