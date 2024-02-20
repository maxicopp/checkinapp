import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './FooterComponent.styles';

const FooterComponent = ({
  onPress,
  onReset,
}: {
  onPress: () => void;
  onReset: () => void;
}) => (
  <>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="store" size={20} color="#FFFFFF" />
      <Text style={styles.buttonText}>Volver a tiendas</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={onReset}>
      <Icon name="refresh" size={20} color="#FFFFFF" />
      <Text style={styles.buttonText}>Resetear Tiendas</Text>
    </TouchableOpacity>
  </>
);

export default FooterComponent;
