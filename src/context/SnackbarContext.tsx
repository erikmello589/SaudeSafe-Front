import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar } from 'react-native-paper';

interface SnackbarContextType {
  showMessage: (message: string, type?: 'success' | 'error') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar deve ser usado dentro de um SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');

  const showMessage = (msg: string, msgType: 'success' | 'error' = 'success') => {
    setMessage(msg);
    setType(msgType);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{
          backgroundColor: type === 'success' ? '#4CAF50' : '#D32F2F', // Verde para sucesso, vermelho para erro
        }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
