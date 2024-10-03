import React, { useState } from 'react';
import {
  View,TextInput,Button,Text,Alert,StyleSheet,TouchableOpacity,Modal,FlatList,} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  // Defina o tipo do array de gêneros
  const genders: string[] = ['Masculino', 'Feminino', 'Outro'];
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        birthdate: birthDate,
        gender,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        navigation.navigate('InitialSetup');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar usuário. Tente novamente.');
    }
  };

  const isEmailValid = (email: string): boolean => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const renderGenderOption = (genderOption: string) => (
    <TouchableOpacity
      style={styles.genderOption}
      onPress={() => {
        setGender(genderOption);
        setModalVisible(false);
      }}
    >
      <Text style={styles.genderOptionText}>{genderOption}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.tip}>Seu nome completo.</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      {email && !isEmailValid(email) && (
        <Text style={styles.error}>E-mail inválido.</Text>
      )}
      <Text style={styles.tip}>Um e-mail válido para contato.</Text>

      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Text style={styles.tip}>Escolha uma senha forte.</Text>

      <TextInput
        placeholder="Data de Nascimento (dd/mm/aaaa)"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <Text style={styles.tip}>Sua data de nascimento.</Text>

      <TouchableOpacity style={styles.genderPicker} onPress={() => setModalVisible(true)}>
        <Text style={styles.genderText}>{gender || "Selecione seu gênero"}</Text>
        <Icon name="chevron-down" size={20} />
      </TouchableOpacity>
      <Text style={styles.tip}>Seu gênero (opcional).</Text>

      <Button title="Registrar" onPress={handleRegister} color="#4CAF50" />

      {/* Modal for Gender Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione seu Gênero</Text>
            <FlatList
              data={genders}
              renderItem={({ item }) => renderGenderOption(item)}
              keyExtractor={(item) => item}
            />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  tip: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  genderPicker: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genderOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  genderOptionText: {
    fontSize: 16,
  },
});

export default RegisterScreen;
