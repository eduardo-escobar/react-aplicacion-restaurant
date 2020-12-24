import React from 'react'
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

export const CardScreen = props => {

  const onClick = () =>{
    props.handleModal(props.id_menu);
  }
    return (
         <Card style={{ width: '90%', marginLeft: 20, margin: 15, paddingTop: 0}} >
              <Card.Content>                
              <Card.Cover source={{ uri: 'data:image/png;base64,'+ props.imagen  }} resizeMode="cover" />
                <Title>{props.nombre}</Title>
                <MaterialCommunityIcons
                  style={{paddingTop: 7, paddingLeft: 0}}
                  name="cash-multiple"
                  color="#694fad"
                  size={26}>
                  <Paragraph> {props.valor}</Paragraph>
                </MaterialCommunityIcons>
                <MaterialCommunityIcons
                  style={{paddingTop: 7, paddingLeft: 0}}
                  name="timer-outline"
                  color="#694fad"
                  size={26}>
                  <Paragraph> {props.tiempo_preparacion} min aprox.</Paragraph>
                </MaterialCommunityIcons>
              </Card.Content>
              <Card.Actions>
                <Button onPress={onClick} >Agregar</Button>
              </Card.Actions>
            </Card>       
    );
}
