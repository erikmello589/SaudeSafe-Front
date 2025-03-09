import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipagem do Contexto de Autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  cadastrar: (username: string, nome: string, sobreNome: string, email: string, senha: string) => Promise<number>;
  login: (emailOuUsername: string, senha: string) => Promise<number>;
  logout: () => Promise<number>;
}

// Criando o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para utilizar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Componente de Provedor de Autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Carrega o token ao iniciar o app
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (token) 
        {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error);
      }
    };

    loadStorageData();
  }, []);

  // Cadastro do usuário
  const cadastrar = async (username: string, name: string, lastName: string, email: string, password: string): Promise<number> => {
    try {
      const response = await fetch('https://fivetfc-api.onrender.com/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, name, lastName, email, password }),
      });

      if (response.status != 201) return 0; // Credenciais inválidas
      
      return 1; // Login bem-sucedido

    } 
    catch (error) 
    {
      console.log('Erro no login:', error);
      return -1; // Erro interno
    }
  };

  // Login do usuário
  const login = async (usernameOrEmail: string, password: string): Promise<number> => {
    try {
      const response = await fetch('https://fivetfc-api.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (response.status != 200) return 0; // Credenciais inválidas

      const data = await response.json();

      // Salvando os tokens e dados do usuário
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('expiresIn', String(data.expiresIn));
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      setIsAuthenticated(true);
      
      return 1; // Login bem-sucedido

    } 
    catch (error) 
    {
      console.log('Erro no login:', error);
      return -1; // Erro inesperado
    }
  };

  // Logout do usuário
  const logout = async (): Promise<number> => {

    try
    {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('expiresIn');
      await AsyncStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      return 1;
    }
    catch (error) 
    {
      console.log('Erro no logout:', error);
      return -1; // Erro inesperado
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, cadastrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
