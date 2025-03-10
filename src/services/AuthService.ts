import AsyncStorage from '@react-native-async-storage/async-storage';

// URL base da API
const API_URL = 'http://10.0.2.2:8080';

// Cadastro do usuário
export const cadastrar = async (username: string, name: string, lastName: string, email: string, password: string): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, name, lastName, email, password }),
    });

    return response.status === 201 ? 1 : 0;
  } catch (error) {
    console.log('Erro no cadastro:', error);
    return -1;
  }
};

// Login do usuário
export const login = async (usernameOrEmail: string, password: string): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernameOrEmail, password }),
    });

    if (response.status !== 200) return 0;

    const data = await response.json();

    // Salvando os tokens e dados do usuário
    await AsyncStorage.setItem('accessToken', data.accessToken);
    await AsyncStorage.setItem('expiresIn', String(data.expiresIn));
    await AsyncStorage.setItem('refreshToken', data.refreshToken);
    
    return 1;
  } catch (error) {
    console.log('Erro no login:', error);
    return -1;
  }
};

// Logout do usuário
export const logout = async (): Promise<number> => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('expiresIn');
    await AsyncStorage.removeItem('refreshToken');
    return 1;
  } catch (error) {
    console.log('Erro no logout:', error);
    return -1;
  }
};
