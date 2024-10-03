import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InitialSetupScreen from './InitialSetupScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Aplicativo de Saúde</Text>
      <InitialSetupScreen></InitialSetupScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default HomeScreen;
