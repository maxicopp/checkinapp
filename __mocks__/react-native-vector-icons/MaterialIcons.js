import React from 'react';
import {Text} from 'react-native';

const MaterialIconsMock = ({name, size, color}) => (
  <Text style={{color, fontSize: size}}>Icon: {name}</Text>
);

export default MaterialIconsMock;
