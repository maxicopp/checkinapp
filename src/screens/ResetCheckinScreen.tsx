import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStores} from '../context/storeContext';

const ResetCheckinScreen = () => {
  const {fetchStores, resetStores} = useStores();
  const animation = new Animated.Value(1);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [buttonColor, setButtonColor] = useState('#FC5511');
  const [iconName, setIconName] = useState('restart');
  const [timer, setTimer] = useState(4);
  const pressTimer = useRef<NodeJS.Timeout>();
  const countdownTimer = useRef<NodeJS.Timeout>();

  const handlePressIn = () => {
    setResetSuccessful(false);
    setButtonColor('#FC5511');
    setIconName('restart');
    setTimer(4);
    Animated.spring(animation, {
      toValue: 0.5,
      friction: 3,
      useNativeDriver: true,
    }).start();

    countdownTimer.current = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    pressTimer.current = setTimeout(async () => {
      clearInterval(countdownTimer.current);
      try {
        await resetStores();
        setResetSuccessful(true);

        fetchStores();
      } catch (error) {
        Alert.alert('Error al resetear tiendas');
      }
    }, 4000);
  };

  const handlePressOut = () => {
    clearInterval(countdownTimer.current);
    clearTimeout(pressTimer.current);
    setTimer(4);
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(countdownTimer.current);
    }
    if (resetSuccessful) {
      setButtonColor('#00C851');
      setIconName('check-circle-outline');
    }
  }, [timer, resetSuccessful]);

  const animatedStyle = {
    transform: [{scale: animation}],
  };

  return (
    <ImageBackground
      source={require('../assets/checkin-animals.jpg')}
      style={styles.flexContainer}>
      <View style={styles.flexContainer}>
        <Text style={styles.infoText}>
          {resetSuccessful
            ? 'Check-ins reseteados con éxito!'
            : 'Para resetear check-ins mantenga presionado'}
        </Text>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.centeredContent}>
          <Animated.View
            style={[
              styles.animatedButton,
              {backgroundColor: buttonColor},
              animatedStyle,
            ]}>
            {resetSuccessful ? (
              <Icon name="check-circle-outline" size={100} color="white" />
            ) : timer < 4 ? (
              <Text style={styles.timerText}>{timer}</Text>
            ) : (
              <Icon name={iconName} size={100} color="white" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
  },
});

export default ResetCheckinScreen;
