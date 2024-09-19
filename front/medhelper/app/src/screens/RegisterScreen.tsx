// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, Alert } from 'react-native';
import axios from 'axios';


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3005/register', {
        name,
        email,
        password,
        birthDate,
        gender
      });
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login'); // Navega para a tela de login após o registro
    } catch (error) {
      Alert.alert('Erro', 'Erro ao registrar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Selecione o Gênero" value="" />
        <Picker.Item label="Masculino" value="male" />
        <Picker.Item label="Feminino" value="female" />
        <Picker.Item label="Outros" value="other" />
      </Picker>
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12
  }
});

export default RegisterScreen;
