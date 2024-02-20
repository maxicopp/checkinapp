import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';
import {StoreProvider} from './src/context/storeContext';

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      <Toast />
    </StoreProvider>
  );
};

export default App;
