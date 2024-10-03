import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

// Definindo a interface para um medicamento
interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  schedule: string;
}

const AddMedicationScreen = () => {
  const [name, setName] = useState<string>(''); // Definindo o tipo explicitamente como string
  const [dosage, setDosage] = useState<string>(''); 
  const [frequency, setFrequency] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]); // Definindo o tipo Medication para o array

  const handleAddMedication = async () => {
    if (!name || !dosage || !frequency || !schedule) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/medications', {
        name,
        dosage,
        frequency,
        schedule,
        user_id: 1, // Substituir pelo ID do usuário logado
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Medicamento adicionado com sucesso!');
        // Atualiza a lista de medicamentos com o novo item adicionado
        const newMedication: Medication = { name, dosage, frequency, schedule };
        setMedications([...medications, newMedication]); // Adiciona o novo medicamento ao estado
        
        // Limpar campos após o sucesso
        setName('');
        setDosage('');
        setFrequency('');
        setSchedule('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao adicionar medicamento. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Medicamento</Text>

      <TextInput
        placeholder="Nome do Medicamento"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Dosagem (ex: 500mg)"
        value={dosage}
        onChangeText={setDosage}
        style={styles.input}
      />
      <TextInput
        placeholder="Frequência (ex: 2x ao dia)"
        value={frequency}
        onChangeText={setFrequency}
        style={styles.input}
      />
      <TextInput
        placeholder="Horário (ex: 08:00, 20:00)"
        value={schedule}
        onChangeText={setSchedule}
        style={styles.input}
      />

      <Button title="Adicionar Medicamento" onPress={handleAddMedication} color="#4CAF50" />

      <FlatList
        data={medications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationText}>{item.name} - {item.dosage}</Text>
            <Text style={styles.medicationText}>Frequência: {item.frequency}</Text>
            <Text style={styles.medicationText}>Horários: {item.schedule}</Text>
          </View>
        )}
      />
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
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  medicationText: {
    fontSize: 16,
  },
});

export default AddMedicationScreen;
