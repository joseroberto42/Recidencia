// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

// Tipagem para o stack de navegação
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);

      Alert.alert('Sucesso', 'Login bem-sucedido');
      navigation.navigate('Home');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Erro', error.response.data.message);
      } else {
        Alert.alert('Erro', 'Erro ao fazer login. Por favor, tente novamente.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Tutorial: Adicione uma imagem ou vídeo explicativo aqui */}
        <View style={styles.tutorialContainer}>
          <Text style={styles.tutorialText}>Seja bem-vindo! Por favor, insira suas informações para acessar o aplicativo.</Text>
          
        </View>

        {/* Logo do aplicativo */}
       {/* <Image source={require('')} style={styles.logo} />*/}

        <Text style={styles.title}>Login</Text>

        {/* Entrada de e-mail */}
        <Text style={styles.inputLabel}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Entrada de senha */}
        <Text style={styles.inputLabel}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Botão de Login */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Mensagem com orientação sobre cadastro */}
        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkButtonText}>Não tem uma conta? Registre-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Estilos para o layout, otimizados para melhor UX/UI
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
  },
  tutorialContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tutorialText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 16,
  },
  tutorialImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 8,
  },
  linkButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default LoginScreen;
