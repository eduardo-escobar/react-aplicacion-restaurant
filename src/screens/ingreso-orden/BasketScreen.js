import React, {useEffect, useState} from 'react';
import {BackgroundScrollView} from '../../components/Background';
import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData, storeData} from '../../util/util';
import {useIsFocused} from '@react-navigation/native';
import {APIKit} from '../../core/utils';

export const BasketScreen = (props) => {
  const [arrayBasket, setArrayBasket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    // props.navigation.addListener('focus', () => {
    setLoading(true);
    getData('arrayBasket')
      .then((v) => {
        setArrayBasket([]);
        setArrayBasket(v);
        totalPrice();

        // The screen is focused
        // Call any action
        //return unsubscribe;
      })
      .catch(() => {
        setLoading(false);
      });
    //});
  }, [isFocused]);

  const handleChange = (action, index) => {
    const newItems = [...arrayBasket]; // clone the array

    let currentQty = newItems[index]['cantidad'];

    if (action == 'more') {
      newItems[index]['cantidad'] =
        currentQty > 19 ? currentQty : currentQty + 1;
    } else if (action == 'less') {
      newItems[index]['cantidad'] = currentQty > 1 ? currentQty - 1 : 1;
    }

    setArrayBasket(newItems);
    storeData(newItems, 'arrayBasket').then((v) => {
      totalPrice();
    });
  };

  const deleteHandler = (index) => {
    let updatedCart = [...arrayBasket]; /* Clone it first */
    updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
    setArrayBasket(updatedCart);
    storeData(updatedCart, 'arrayBasket').then((v) => {
      totalPrice();
      props.setCanasta(updatedCart.length);
    });
  };

  const totalPrice = () => {
    getData('arrayBasket')
      .then((v) => {
        let suma = 0;
        console.log(
          v.map((it) => {
            console.log(it.cantidad);
            return it.cantidad * it.valor;
          }),
        );
        suma = v.reduce((sum, it) => sum + it.cantidad * it.valor, 0);
        setTotal(suma);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const agregarPedido = () => {
    setLoading(true);

    getData('idOrden').then((v) => {
      console.log(`Valor de orden: ${v}`);
      if (v == '0') {
        try {
          getData('arrayBasket').then((v) => {
            getData('id_sesion').then((sesion) => {
              console.log(sesion);
              const json = {
                id_sesion: sesion,
                listaPedidos: v.map((v) => {
                  return {
                    id_menu: v.id_menu,
                    cantidad: v.cantidad,
                    valor: v.valor,
                  };
                }),
              };

              APIKit.post('/Aplicacion/AgregarOrden', json, {
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then((data) => {
                if (data.data == null) {
                  this.dropDownAlertRef.alertWithType(
                    'error',
                    'Error',
                    'Lo sentimos, ha ocurrido un error, por favor informar a administración',
                  );
                  setLoading(false);
                  return;
                } else {
                  console.log(`Id de la orden ${data.data}`);
                  storeData(data.data, 'idOrden').then(() => {
                    props.setPedidoAgregado(true);
                    props.setCanasta(0);
                    setArrayBasket([]);

                    storeData([], 'arrayBasket').then(() => {
                      totalPrice();
                      setLoading(false);
                    });
                  });
                }
              });
            });
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
      } else {
        console.log('Orden ya fue agregada');
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      {loading ? (
        <View style={[styles.centerElement, {height: 300}]}>
          <ActivityIndicator size="large" color="#ef5739" />
        </View>
      ) : (
        <BackgroundScrollView>
          {arrayBasket.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  marginBottom: 2,
                  height: 120,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexGrow: 1,
                    flexShrink: 1,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                    }}
                    style={{paddingRight: 10}}>
                    <Image
                      source={{uri: 'data:image/png;base64,' + item.imagen}}
                      style={[
                        styles.centerElement,
                        {height: 60, width: 60, backgroundColor: '#eeeeee'},
                      ]}
                    />
                  </TouchableOpacity>
                  <View
                    style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 15}}>
                      {item.nombre}
                    </Text>
                    <Text numberOfLines={1} style={{color: '#8f8f8f'}}>
                      {`Tiempo : ${
                        item.cantidad > 1
                          ? item.tiempo_preparacion == 0
                            ? 0
                            : item.tiempo_preparacion * item.cantidad - 20
                          : item.tiempo_preparacion
                      } min aprox `}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{color: '#333333', marginBottom: 10}}>
                      {`$${item.cantidad * item.valor}`}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => handleChange('less', i)}
                        style={{borderWidth: 1, borderColor: '#9D8AD0'}}>
                        <Ionicons
                          name="remove-outline"
                          size={22}
                          color="#9D8AD0"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: '#9D8AD0',
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: '#bbbbbb',
                          fontSize: 13,
                        }}>
                        {item.cantidad}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleChange('more', i)}
                        style={{borderWidth: 1, borderColor: '#9D8AD0'}}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={22}
                          color="#9D8AD0"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={[styles.centerElement, {width: 60}]}>
                  <TouchableOpacity
                    style={[styles.centerElement, {width: 32, height: 32}]}
                    onPress={() => deleteHandler(i)}>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={25}
                      color="#ee4d2d"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </BackgroundScrollView>
      )}

      {loading ? null : (
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
                <Text style={{color: '#8f8f8f', fontSize: 17}}>Total: </Text>
                <Text style={{color: 'black', fontSize: 15}}>${total}</Text>
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
                getData('arrayBasket')
                  .then((v) => {
                    setLoading(true);
                    if (v.length > 0) {
                      Alert.alert(
                        'Confirmación Pedido',
                        '¿Esta seguro que desea confirmar su pedido?',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log,
                            style: 'cancel',
                          },
                          {
                            text: 'Confirmar',
                            onPress: () => {
                              agregarPedido();
                            },
                          },
                        ],
                        {cancelable: false},
                      );
                    } else {
                      Alert.alert(
                        'Canasta vacía',
                        'Debes agrager un pedido para continuar',
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ],
                        {cancelable: true},
                      );
                    }

                    setLoading(false);
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }}>
              <Text style={{color: '#ffffff'}}>Confirmar Orden</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
