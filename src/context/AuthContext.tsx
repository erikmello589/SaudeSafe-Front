import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cadastrar, login, logout } from '../services/AuthService';

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
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error);
      }
    };

    loadStorageData();
  }, []);

  // Envelopa as funções do authService para atualizar o estado de autenticação
  const handleLogin = async (emailOuUsername: string, senha: string) => {
    const result = await login(emailOuUsername, senha);
    if (result === 1) setIsAuthenticated(true);
    return result;
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result === 1) setIsAuthenticated(false);
    return result;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, cadastrar, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
