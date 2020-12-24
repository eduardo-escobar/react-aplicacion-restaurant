import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {ActivityIndicator, Divider, List} from 'react-native-paper';
import {ResumenScreen} from './ResumenScreen';
import {BackgroundScrollView} from '../../components/Background';
import Paragraph from '../../components/Paragraph';
import {
  useIsFocused,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {APIKit} from '../../core/utils';
import {getData, storeData} from '../../util/util';
import {ModalResumenPago} from './ModalResumenPago';

export const PedidoScreen = (props) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [pedido, setPedido] = useState({});
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const realizarPost = () => {
    return new Promise((res, rej) => {
      getData('idOrden').then((v) => {
        const id = v;
        console.log('Id: ' + id);
        if (!(v == '0')) {
          console.log('Entro ');
          APIKit.get('/Pedidos/ObtenerPedido/' + v).then((data) => {
            res(data.data);
          });
        } else {
          res(null);
        }
      });
    });
  };

  const handlePagarPedido = () => {
    showModal();
  };
  const handleGoHome = () => {
    storeData(null, 'id_sesion').then(() => {
      hideModal();
      navigation.navigate('Siglo XXI');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Siglo XXI'}],
        }),
      );
    });
  };

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      props.setPedidoAgregado(false);
      try {
        setLoading(true);
        realizarPost().then((data) => {
          if (data == null) {
            setLoading(false);
            return;
          } else {
            getData('idOrden').then((v) => {
              setPedido({idOrden: v, pedidos: data});
              setLoading(false);
            });
          }
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, [isFocused]);

  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      {loading ? (
        <View style={[styles.centerElement, {height: 300}]}>
          <ActivityIndicator size="large" color="#ef5739" />
        </View>
      ) : Object.keys(pedido).length == 0 && pedido.constructor === Object ? (
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}>
          <Paragraph>No se ha agregado ningun pedido</Paragraph>
        </View>
      ) : (
        <>
          <ModalResumenPago
            visible={visible}
            pedido={pedido}
            handleGoHome={handleGoHome}
            hideModal={hideModal}
          />
          <BackgroundScrollView>
            <ResumenScreen pedido={pedido} />
          </BackgroundScrollView>

          <View
            style={{
              backgroundColor: '#fff',
              borderTopWidth: 2,
              borderColor: '#f6f6f6',
              paddingVertical: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  flexShrink: 1,
                  paddingBottom: 10,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 20,
                    alignItems: 'center',
                  }}>
                  {/* <Text style={{color: '#8f8f8f', fontSize: 17}}>Total: </Text>
                  <Text style={{color: 'black', fontSize: 15}}>121</Text> */}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                height: 32,
                paddingRight: 20,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: '#9D8AD0',
                    width: 150,
                    height: 35,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => {
                  Alert.alert(
                    'Confirmación Pedido',
                    '¿Esta seguro que desea pagar su pedido?',
                    [
                      {
                        text: 'Cancelar',
                        onPress: () => console.log,
                        style: 'cancel',
                      },
                      {
                        text: 'Confirmar',
                        onPress: () => {
                          handlePagarPedido();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Text style={{color: '#ffffff'}}>Pagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
