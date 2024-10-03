import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

// Defina o tipo para o Health Record
interface HealthRecord {
  id: number;
  type: string;
  value: string;
  recorded_at: string; // ou Date, se preferir usar um objeto de data
}

const HealthRecordScreen = () => {
  // Atualize o tipo do estado healthRecords para ser um array de HealthRecord
  const [type, setType] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]); // Estado tipado corretamente

  // Função para adicionar novo registro de saúde
  const handleAddRecord = async () => {
    if (!type || !value) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Aqui você pode substituir pelo seu endpoint da API
      const response = await axios.post<HealthRecord>('http://localhost:5000/api/health-records', {
        type,
        value,
      });

      // Adiciona o novo registro à lista localmente
      setHealthRecords([...healthRecords, response.data]);
      setType('');
      setValue('');
      Alert.alert('Sucesso', 'Registro de saúde adicionado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar registro de saúde.');
    }
  };

  // Renderiza cada item da lista de registros
  const renderItem = ({ item }: { item: HealthRecord }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordText}>Tipo: {item.type}</Text>
      <Text style={styles.recordText}>Valor: {item.value}</Text>
      <Text style={styles.recordText}>Data: {item.recorded_at}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros de Saúde</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tipo (Ex: Pressão Arterial)"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor (Ex: 120/80)"
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
        />
        <Button title="Adicionar Registro" onPress={handleAddRecord} />
      </View>

      <FlatList
        data={healthRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Certifique-se de que cada item tem um `id`
        ListEmptyComponent={<Text style={styles.noRecordsText}>Nenhum registro de saúde encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  recordItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recordText: {
    fontSize: 16,
  },
  noRecordsText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});

export default HealthRecordScreen;
