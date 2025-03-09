import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { cadastrar } = useAuth();
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [sobreNome, setSobreNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    const result = await cadastrar(username, nome, sobreNome, email, senha);
    if (result === 1) 
    {
      navigation.replace('Login'); // Redireciona para a pagina de login
    } 
    else 
    {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Cadastro</Text>
      
      <TextInput
        label="Usuário"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Nome"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Sobrenome"
        value={sobreNome}
        onChangeText={setSobreNome}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
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

      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Cadastrar
      </Button>

      <Button mode="text" onPress={() => navigation.navigate('Login')}>
        Já tenho uma conta
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
