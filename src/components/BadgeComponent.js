import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Badge} from 'react-native-paper';

const BadgeComponent = () => {
  return <Badge selectable={focused} style={style.badgeStyle}>0</Badge>;
};

const style = StyleSheet.create({
  badgeStyle: {
    backgroundColor: '#fff',
    color: '#9D8AD0',
  },
});

export default BadgeComponent;
