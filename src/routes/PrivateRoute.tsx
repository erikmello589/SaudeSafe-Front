import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen  from '../screens/LoginScreen';

const Stack = createStackNavigator();

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        // Rotas privadas (apenas para usuários logados)
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      ) : (
        // Se não estiver logado, redireciona para Login
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default PrivateRoute;
