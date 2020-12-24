import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground,
} from 'react-native';
import InputSpinner from 'react-native-input-spinner';

export const ModalPlatoScreen = (props) => {
  const image = {uri: 'data:image/png;base64,' + props.imagen};

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        visible={props.visible}
        transparent={true}
        onDismiss={props.hideModal}>
        <View style={styles.centeredView, styles.modalBlur}>
          <View style={styles.modalView}>
            <View style={styles.backgroundContainer}>
              <ImageBackground
                source={image}
                style={styles.image}></ImageBackground>

              <Text style={styles.modalTitleText}>{props.nombre}</Text>
              <Text style={styles.modalText}>{props.descripcion}</Text>
              <Text style={styles.modalQuantityText}>Cantidad</Text>

              <View style={styles.centeredView}>
                <InputSpinner
                  max={20}
                  min={1}
                  step={1}
                  width={280}
                  height={40}
                  value={1}
                  onChange={(value) => {
                    props.setCantidad(value);
                  }}
                  rounded={false}
                  showBorder={true}
                  activeOpacity={0.7}
                  color={'#9D8AD0'}
                />
              </View>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#694fad'}}
                onPress={() => {
                  props.handleAddBasket(props.id_menu);
                  props.hideModal();
                }}>
                <Text style={styles.textStyle}>Agregar</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.overlay}>
              <TouchableHighlight
                style={{width: 20, height: 20}}
                onPress={() => props.hideModal()}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/close_x.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    height: 500,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
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
    backgroundColor: '#F194FF',
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
    marginBottom: 10,
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
