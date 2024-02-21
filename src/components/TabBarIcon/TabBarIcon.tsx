import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TabBarIconProps {
  route: {name: string};
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon = ({route, focused, color, size}: TabBarIconProps) => {
  let iconName: string = '';
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home';
  } else if (route.name === 'Reset checkin') {
    iconName = focused ? 'app-registration' : 'app-registration';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person';
  }
  return <MaterialIcons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
