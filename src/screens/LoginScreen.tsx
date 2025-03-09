import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [emailOuUsername, setEmailOuUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    const result = await login(emailOuUsername, senha);
    if (result === 1) {
      navigation.replace('Private'); // Redireciona para a Home ao logar
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Login</Text>
      
      <TextInput
        label="E-mail ou Usuário"
        value={emailOuUsername}
        onChangeText={setEmailOuUsername}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Register')}>
        Criar uma conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
