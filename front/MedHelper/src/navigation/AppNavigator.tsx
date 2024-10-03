// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import InitialSetupScreen from '../screens/InitialSetupScreen';
import Layout from './Layout'; // Importando o Layout

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Register" component={RegisterScreen} />         
      <Stack.Screen name="InitialSetup" component={InitialSetupScreen} />
      <Stack.Screen name="Login" component={Layout} /> 
    </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default AppNavigator;
