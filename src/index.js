import React, {useEffect, useState} from 'react';
import connect from 'react-redux';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {theme} from './core/theme';
import {HomeScreen} from './screens';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import RegisterScreen from './screens/RegisterScreen';
import UsuarioInfoScreen from './screens/UsuarioInfo';
import ReservaScreen from './screens/ReservaScreen';
import IngresoOrdenScreen from './screens/ingreso-orden/IngresoOrdenScreen';
import {BasketScreen} from './screens/ingreso-orden/BasketScreen';
import {PedidoScreen} from './screens/ingreso-orden/PedidoScreen';
import BadgeComponent from './components/BadgeComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import { AsginacionMesaScreen } from './screens/AsginacionMesaScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Siglo XXI"
      barStyle={{backgroundColor: '#f0edf6'}}      
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      }}
      activeColor="#694fad"
      labeled={false}
      >
      <Tab.Screen
        name="Siglo XXI"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reserva"
        component={ReservaScreen}
        options={{
          tabBarLabel: 'Reserva',
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="book-online"
              color={color}
              size={26}
              style={{width: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AsginacionMesa"
        component={AsginacionMesaScreen}
        options={{
          tabBarLabel: 'AsginacionMesa',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="table-chair"
              color={color}
              size={26}
              style={{width: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="UsuarioInfoScreen"
        component={UsuarioInfoScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function SettingsScr(setCanasta) {
  return (
    <TabTop.Navigator>
      <TabTop.Screen name="Hamburguesas" children={() => SettingsScreen(setCanasta,2)}/>
      <TabTop.Screen name="Bebestibles" children={() => SettingsScreen(setCanasta,1)}/>
      <TabTop.Screen name="Almuerzos" children={() => SettingsScreen(setCanasta,3)}/>
    </TabTop.Navigator>
  );
}

function SettingsScreen(setCanasta, id_categoria) {
  return (
    <IngresoOrdenScreen setCanasta={setCanasta} id_categoria={id_categoria} />
  );
}

function Orden() {
  const [canasta, setCanasta] = useState(0);
  const [pedidoAgregado, setPedidoAgregado] = useState(false);
  return (
    <Tab.Navigator
      initialRouteName="Orden"      
      activeColor="#694fad"
      inactiveColor="#989898"
      labeled={false}
      barStyle={{backgroundColor: '#f0edf6'}}>
      <Tab.Screen
        name="Orden"
        children={() => SettingsScr(setCanasta)}
        //component={SettingsScr(setCanasta)}
        options={{
          tabBarLabel: 'Orden',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="menu-book" color={color} size={26} />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Carro"
        //component = {BasketScreen}
        children={() => (
          <BasketScreen setCanasta={setCanasta} setPedidoAgregado={setPedidoAgregado}  />
        )}
        options={{
          tabBarBadge: canasta == 0 ? false : canasta,
          tabBarLabel: 'Canasta',
          tabBarIcon: ({color}) => (
            <FontAwesome
              name="shopping-basket"
              color={color}
              size={26}
              style={{width: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pedido"
        //component={PedidoScreen}
        children={() => (
          <PedidoScreen setPedidoAgregado={setPedidoAgregado}  />
          //navigation={navigation}
        )}
        options={{
          tabBarLabel: 'Pedido',
          tabBarBadge: pedidoAgregado,
          tabBarIcon: ({color}) => (
            <Ionicons
              name="ios-restaurant-outline"
              color={color}
              size={26}
              style={{width: 30,marginRight:10}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        {/* <Stack.Screen name="IngresoOrdenScreen" component={IngresoOrdenScreen} /> */}
        <Stack.Screen name="Siglo XXI" component={Home} />
        <Stack.Screen name="Orden" component={Orden} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
