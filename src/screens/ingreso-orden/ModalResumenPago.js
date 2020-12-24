import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import {DataTable, RadioButton} from 'react-native-paper';
import TextInput from '../../components/TextInput';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {BackgroundScrollView} from '../../components/Background';
import Paragraph from '../../components/Paragraph';
import {APIKit} from '../../core/utils';
import {getData} from '../../util/util';
import LottieView from 'lottie-react-native';

export const ModalResumenPago = (props) => {
  const [value, setValue] = useState('efectivo');
  const isFocused = useIsFocused();
  const [total, setTotal] = useState(0);
  const [idOrden, setOrden] = useState(0);
  const [rut, setRut] = useState(0);
  const [yaPagado, setyaPagado] = useState(false);
  const [estaPagando, setEstaPagando] = useState(false);

  let time;
  let boleta_id;

  const totalPrice = () => {
    let suma = 0;
    suma =
      props.pedido.pedidos &&
      props.pedido.pedidos.reduce((sum, it) => sum + it.cantidad * it.valor, 0);
    setTotal(suma);
  };

  const handlePago = () => {
    try {
      const json = JSON.stringify({
        rut,
        idOrden,
      });

      APIKit.post('/Pedidos/Pagar', json, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => {
        boleta_id = data.data;
        let i = 0;
        time = setInterval(() => {
          console.log(`Paso por timer, la boleta: ${boleta_id}`);
          if (i == 1) {
            clearInterval(time);
            setyaPagado(true);
            setEstaPagando(false);
          }
          i++;
        }, 10000);
      });
      setEstaPagando(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (isFocused) {
      getData('keyUsuario').then((value) => {
        console.log('LLego rut: ' + value._rut);
        setRut(value._rut);
      });

      getData('idOrden').then((v) => {
        const id = v;
        console.log('Id: ' + id);
        setOrden(id);
        totalPrice();
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        visible={props.visible}
        transparent={true}
        onDismiss={props.hideModal}>
        <View style={{...styles.centeredView, ...styles.modalBlur}}>
          <View
            style={estaPagando ? styles.modalEstaPagando : styles.modalView}>
            <View style={styles.backgroundContainer}>
              {yaPagado ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <LottieView
                    source={require('../../assets/782-check-mark-success.json')}
                    autoPlay
                     loop ={false}
                     style={{width:300, height:150, paddingTop: 40}}
                  />                  
                  <Text style={styles.text}>Pago Completado</Text>
                  <Paragraph> Gracias, la transacción de tu pago ha sido realizado correctamente </Paragraph>
                  <View style={styles.footerWrapper}>
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#694fad',
                        width: 150,
                      }}
                      onPress={() => {
                        props.handleGoHome();
                      }}>
                      <Text style={styles.textStyle}>Aceptar</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              ) : estaPagando ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Paragraph>Favor dirigirse a caja o pagar a garzón</Paragraph>
                  <ActivityIndicator size="large" color="#ef5739" />
                </View>
              ) : (
                <>
                  <View style={{...styles.containerDetail, marginTop: 8}}>
                    <BackgroundScrollView>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title>Producto</DataTable.Title>
                          <DataTable.Title numeric>Cant.</DataTable.Title>
                          <DataTable.Title numeric>Precio</DataTable.Title>
                        </DataTable.Header>
                        {props.pedido.pedidos &&
                          props.pedido.pedidos.map((prod) => (
                            <DataTable.Row key={prod.id_menu}>
                              <DataTable.Cell style={{flex: 3}}>
                                {prod.nombre}
                              </DataTable.Cell>
                              <DataTable.Cell numeric style={{marginRight: 10}}>
                                {prod.cantidad}
                              </DataTable.Cell>
                              <DataTable.Cell numeric>
                                ${prod.valor}
                              </DataTable.Cell>
                            </DataTable.Row>
                          ))}
                      </DataTable>
                    </BackgroundScrollView>
                  </View>
                  <View style={styles.containerDetail}>
                    <DataTable>
                      <DataTable.Row>
                        <DataTable.Cell>Total</DataTable.Cell>
                        <DataTable.Cell></DataTable.Cell>
                        <DataTable.Cell numeric>${total}</DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>
                    <View>
                      <RadioButton.Group
                        onValueChange={(value) => setValue(value)}
                        value={value}>
                        <View style={styles.footerWrapper}>
                          <Text style={{margin: 10, marginStart: 7}}>
                            Efectivo
                          </Text>
                          <RadioButton value="efectivo" />
                          <Text style={{margin: 10}}>Tarjeta</Text>
                          <RadioButton value="tarjeta" />
                        </View>
                      </RadioButton.Group>
                    </View>

                    <TextInput
                      label="Comentarios (opcional)"
                      returnKeyType="next"
                      style={{width: 300, marginLeft: 12}}
                    />
                  </View>
                  <View style={styles.footerWrapper}>
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: 'gray',
                        width: 150,
                      }}
                      onPress={() => {
                        //props.handleAddBasket(props.id_receta);
                        props.hideModal();
                      }}>
                      <Text style={styles.textStyle}>Cancelar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={{
                        ...styles.openButton,
                        backgroundColor: '#694fad',
                        width: 150,
                      }}
                      onPress={() => {
                        //props.handleAddBasket(props.id_receta);
                        handlePago();
                      }}>
                      <Text style={styles.textStyle}>Pagar</Text>
                    </TouchableHighlight>
                  </View>
                </>
              )}
            </View>

            {/* <View style={styles.overlay}>
              <TouchableHighlight
                style={{width: 20, height: 20}}
                onPress={() => props.hideModal()}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/close_x.png')}
                />
              </TouchableHighlight>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 14,
    marginTop:30,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
    flexDirection: 'row',
  },
  //non-container style wrapper for scrollview
  footerWrapperNC: {
    flexDirection: 'column',
  },
  containerRadio: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerDetail: {
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 200,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#FFF',
  },
  logo: {
    width: 20,
    height: 20,
    margin: 5,
  },
  centeredView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBlur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100, 0.5)',
    padding: 30,
  },
  leftView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 22,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 350,
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalView: {
    height: 480,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    width: 350,
    zIndex: 10,
    alignItems: 'stretch',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalEstaPagando: {
    height: 100,
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    width: 350,
    zIndex: 10,
    alignItems: 'stretch',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingStart: 5,
    paddingTop: 2,
    color: 'black',
    textAlign: 'left',
  },
  modalText: {
    fontSize: 14,
    margin: 3,
    paddingStart: 5,
    textAlign: 'left',
    color: 'rgba(0,0,0,0.5)',
  },
  modalQuantityText: {
    fontSize: 15,
    paddingStart: 5,
    textAlign: 'left',
    color: 'rgba(89,89,89,1)',
    fontWeight: 'bold',
    backgroundColor: 'rgba(214,214,214,0.5)',
  },
});
