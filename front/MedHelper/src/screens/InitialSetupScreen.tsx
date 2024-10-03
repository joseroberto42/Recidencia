import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialSetupScreen = () => {
  const [medicationTime, setMedicationTime] = useState('');
  const [healthDataTypes, setHealthDataTypes] = useState('');

  const handleSavePreferences = async () => {
    try {
      const preferences = {
        medicationTime,
        healthDataTypes,
      };
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      Alert.alert('Sucesso', 'Preferências salvas com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar preferências.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuração Inicial</Text>

      <Text style={styles.subtitle}>Defina suas preferências:</Text>

      <TextInput
        placeholder="Horário de Medicamentos (ex: 08:00, 14:00)"
        value={medicationTime}
        onChangeText={setMedicationTime}
        style={styles.input}
      />
      <Text style={styles.tip}>Informe os horários em que você toma seus medicamentos.</Text>

      <TextInput
        placeholder="Tipos de Dados de Saúde (ex: Pressão Arterial, Glicose)"
        value={healthDataTypes}
        onChangeText={setHealthDataTypes}
        style={styles.input}
      />
      <Text style={styles.tip}>Informe os tipos de dados que você gostaria de registrar.</Text>

      <Button title="Salvar Preferências" onPress={handleSavePreferences} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  tip: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
});

export default InitialSetupScreen;
