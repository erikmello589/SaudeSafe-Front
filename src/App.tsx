import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { PacienteProvider } from './context/PacienteContext';
import { SnackbarProvider } from './context/SnackbarContext'; // Certifique-se de importar o SnackbarProvider
import Routes from './routes/Routes';
import { lightTheme } from './theme/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <AuthProvider>
          <PacienteProvider>
              <PaperProvider theme={lightTheme}>
                <Routes />
              </PaperProvider>
          </PacienteProvider>
        </AuthProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
}
