import React, {useEffect, useState} from 'react';
import {
  Portal,
  Provider,
  Button,
  Card,
  Title,
  Paragraph,
  FAB,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {APIKit} from '../../core/utils';
import Background, {BackgroundScrollView} from '../../components/Background';
import {CardScreen} from '../helper/CardScreen';
import {FlatList} from 'react-native-gesture-handler';
import {SearchScreen} from '../helper/SearchScreen';
import {ModalPlatoScreen} from './ModalPlatoScreen';
import {getData, storeData} from '../../util/util';

export default IngresoOrdenScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [arrayComida, setArrayComida] = useState([]);
  const [visible, setVisible] = useState(false);
  const [receta, setReceta] = useState({});
  const [cantidad, setCantidad] = useState(1);

  const showModal = () => setVisible(true);
  
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setLoading(true);
    APIKit.get('Aplicacion/ListaPlatos')
      .then((data) => {
        setArrayComida(data.data.filter(c => c.categoria_id == props.id_categoria));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddBasket = (id_menu) => {
    console.log(id_menu, cantidad);
    const rec = arrayComida.find((v) => v.id_menu == id_menu);
    rec.cantidad = cantidad;
    getData('arrayBasket').then(array =>{
      const menu = array.find(v => v.id_menu == id_menu);
      menu ? (menu.cantidad = cantidad) : array.push(rec);
      storeData(array,"arrayBasket");
      props.setCanasta(array.length);
    });

    setCantidad(1);
  };

  const handleModal = (id_menu) => {
    console.log(id_menu);
    const rec = arrayComida.find((v) => v.id_menu == id_menu);
    rec.cantidad = 1;
    setReceta(rec);
    showModal();
  };

  // console.log(arrayComida);
  // arrayComida.map((item) => <CardScreen key={item.id_receta} {...item} />)
  return (
    <>
      <ModalPlatoScreen
        visible={visible}
        hideModal={hideModal}
        {...receta}
        handleAddBasket={handleAddBasket}
        setCantidad={setCantidad}
      />
      {!loading ? (
        <FlatList
          data={arrayComida}
          keyExtractor={(item) => item.id_menu.toString()}
          renderItem={({item}) => (
            <CardScreen
              key={item.id_menu}
              {...item}
              handleModal={handleModal}
            />
          )}
        />
      ) : (
        <View style={[styles.centerElement, {height: 300}]}>
          <ActivityIndicator
            style={{paddingTop: 20}}
            animating={true}
            color={Colors.deepPurpleA200}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  centerElement: {justifyContent: 'center', alignItems: 'center'},
});
