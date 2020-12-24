import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {APIKit} from '../core/utils';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {getData, storeData} from '../util/util';
import GestionReserva from './GestionReserva';

const ReservaScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [reserva, setReserva] = useState(false);
  const [enReserva, setEnReserva] = useState(false);
  const [mesaUsuario, setMesaUsuario] = useState({fecha: '', mesa: '',idReserva : ''});
  const [loading, setLoading] = useState(false);
  const onStateChange = ({open}) => setOpen(open);

  const handleReserva = ({fecha,mesa,idReserva}) => {
   console.log(`Valores de fecha y mesa; ${fecha} , ${mesa},  ${idReserva}`)
    setMesaUsuario({fecha, mesa, idReserva});
    setEnReserva(false);
    setReserva(true);
  };

  const handleCancelar = () => {
   
    const json = JSON.stringify({
      id_reserva: mesaUsuario.idReserva,
    });

    APIKit.post('/Aplicacion/CancelarReserva', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        if (data.data == null) {
          return;
        } else { 
          setMesaUsuario({fecha: '', mesa: '',idReserva : ''})
          setEnReserva(false);
          setReserva(false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {/* <View>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
      </View> */}
      <Provider>
        <Portal>
          {/* {loading ? (<ActivityIndicator style={{paddingTop: 20}} animating={true} color={Colors.deepPurpleA200} />) : null} */}
          {loading ? (
            <ActivityIndicator
              style={{paddingTop: 20}}
              animating={true}
              color={Colors.deepPurpleA200}
            />
          ) : null}

          {enReserva ? (
              <GestionReserva handleReserva={handleReserva}  />
          ) : null}

          {reserva ? (
            <Card style={{paddingTop: 10}}>
              <Card.Content>
                <Title>Reserva</Title>
                <MaterialCommunityIcons
                  style={{paddingTop: 7, paddingLeft: 0}}
                  name="calendar-check-outline"
                  color="#694fad"
                  size={26}>
                  <Paragraph>{mesaUsuario.fecha}</Paragraph>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons
                  style={{paddingTop: 7, paddingLeft: 0}}
                  name="table-furniture"
                  color="#694fad"
                  size={26}>
                  <Paragraph>N° de mesa: {mesaUsuario.mesa}</Paragraph>
                </MaterialCommunityIcons>
              </Card.Content>
              {/* <Card.Cover source={require('../assets/reserva.png')} /> */}
              <Card.Actions>
                <Button onPress={handleCancelar}>Cancelar</Button>
              </Card.Actions>
            </Card>
          ) : null}
          <FAB.Group
            open={open}
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
              // {icon: 'plus', onPress: () => console.log('Pressed add')},
              // {
              //   icon: 'table-chair',
              //   label: 'Ingresar mesa',
              //   onPress: () => {
              //     if (!reserva) {
              //       storeData([],"arrayBasket");
              //       storeData(0,"idOrden");
              //       navigation.navigate('Orden');
              //     }
              //   },
              // },
              {
                icon: 'calendar-multiple-check',
                label: 'Reservar',
                onPress: () => {
                  if (!enReserva && !reserva) {
                    setEnReserva(true);
                  }
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </>
  );
};

export default ReservaScreen;
