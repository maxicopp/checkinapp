import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigators/BottomTabNavigator';
import {StoreProvider} from './src/context/storeContext';

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
