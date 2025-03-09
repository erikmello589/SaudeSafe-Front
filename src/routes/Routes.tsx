import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrivateRoute from './PrivateRoute';  // Mantendo PrivateRoute
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Rotas públicas (acessíveis sem login) */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        
        {/* Rota para o PrivateRoute (vai decidir se o usuário vai para Login ou Home) */}
        <Stack.Screen name="Private" component={PrivateRoute} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
