import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ResetCheckinScreen from '../screens/ResetCheckinScreen/ResetCheckinScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import TabBarIcon from '../components/TabBarIcon/TabBarIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const scheme = useColorScheme();
  const isDarkTheme = scheme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => <TabBarIcon route={route} {...props} />,
        tabBarActiveTintColor: isDarkTheme ? '#FF5410' : 'tomato',
        tabBarInactiveTintColor: isDarkTheme ? '#ffffff' : '#000000',
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDarkTheme ? '#5D4F4A' : '#E2E2E2',
          borderTopWidth: 0.3,
        },
        tabBarLabel: () => null,
      })}>
      <Tab.Screen name="Menu" component={HomeScreen} />
      <Tab.Screen name="Resetear Checkin" component={ResetCheckinScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
