import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from 'react-native-paper';

export const ResumenScreen = (props) => {
  return (
    <>
      <View>
        <Text style={styles.modalQuantityText}>Información del pedido: </Text>

        <View style={{marginStart: 10}}>
          <Text style={{marginStart: 20, fontSize: 15}}>
            Id de orden: {props.pedido.idOrden}
          </Text>
          <Text style={{marginStart: 20, fontSize: 15}}>
            Fecha de Ingreso: {props.pedido && props.pedido.pedidos[0].fecha_creacion}
          </Text>
          <Text style={{marginStart: 20, fontSize: 15}}>
            Estado: {props.pedido && props.pedido.pedidos[0].estado}
          </Text>
        </View>

        <Text style={styles.modalQuantityText}>Productos: </Text>
        {props.pedido.pedidos &&
          props.pedido.pedidos.map((prod) => (
            <View
              key={prod.id_menu}
              style={{
                flexDirection: 'row',
                backgroundColor: '#F2F2F2',
                marginBottom: 2,
                marginStart: 20,
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
                    source={{uri: 'data:image/png;base64,' + prod.imagen}}
                    style={[
                      styles.centerElement,
                      {height: 60, width: 60, backgroundColor: '#8f8f8f'},
                    ]}
                  />
                </TouchableOpacity>
                <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                  <Text numberOfLines={1} style={{fontSize: 15}}>
                    {prod.nombre}
                  </Text>
                  <Text numberOfLines={1} style={{color: '#8f8f8f'}}>
                    Cantidad: {prod.cantidad}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{color: '#333333', marginBottom: 10}}>
                    Total: {`$${prod.cantidad * prod.valor}`}
                  </Text>
                </View>
              </View>
              <Divider />
            </View>
          ))}

        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalQuantityText: {
    fontSize: 13,
    paddingStart: 5,
    margin: 10,
    textAlign: 'left',
    color: 'rgba(89,89,89,1)',
    fontWeight: 'bold',
  },
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
