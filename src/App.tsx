import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { PacienteProvider } from './context/PacienteContext';
import Routes from './routes/Routes';

export default function App() {
  return (
    <AuthProvider>
      <PacienteProvider>
        <PaperProvider theme={lightTheme}>
          <Routes />
        </PaperProvider>
      </PacienteProvider>
    </AuthProvider>
  );
}
