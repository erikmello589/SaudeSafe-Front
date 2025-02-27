import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { lightTheme } from './theme/theme'
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={lightTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SaudeSafe">
          <Stack.Screen name="SaudeSafe" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
