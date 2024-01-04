import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {RootStackNavigation} from './navigations/RootStackNavigation';

export const RootApp: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
