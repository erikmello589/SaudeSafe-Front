import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as PacienteService from '../services/PacienteService'; 

// Tipagem do Contexto de Paciente
interface PacienteContextType {
  currentPacienteId: string | null;
  selectPaciente: (PacienteId: string) => Promise<number>;
  clearPaciente: () => Promise<number>;
  postPaciente: (UserToken: string, nomePaciente: string, sobrenomePaciente: string) => Promise<number>;
  getPacientes: (UserToken: string) => Promise<number>;
  putPaciente: (UserToken: string, pacienteId: string, nomePaciente: string, sobrenomePaciente: string) => Promise<number>;
  deletePaciente: (UserToken: string, pacienteId: string) => Promise<number>;
}

// Criando o Contexto
const PacienteContext = createContext<PacienteContextType | undefined>(undefined);

// Hook para utilizar o contexto
export const usePaciente = () => {
  const context = useContext(PacienteContext);
  if (!context) {
    throw new Error('usePaciente deve ser usado dentro de um PacienteProvider');
  }
  return context;
};

// Componente de Provedor de Paciente
export const PacienteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPacienteId, setCurrentPacienteId] = useState<string | null>(null);

  // Carrega o paciente selecionado ao iniciar o app
  useEffect(() => {
    const loadPaciente = async () => {
      try {
        const PacienteId = await AsyncStorage.getItem('currentPacienteId');
        if (PacienteId) {
          setCurrentPacienteId(PacienteId);
        }
      } catch (error) {
        console.log('Erro ao carregar o paciente do AsyncStorage:', error);
      }
    };

    loadPaciente();
  }, []);

  // Seleciona um novo paciente
  const selectPaciente = async (PacienteId: string): Promise<number> => {
    try {
      await AsyncStorage.setItem('currentPacienteId', PacienteId);
      setCurrentPacienteId(PacienteId);
      console.log("Paciente selecionado com sucesso.");
      return 1;
    } catch (error) {
      console.log('Erro ao salvar o paciente selecionado:', error);
      return -1;
    }
  };

  // Criar um novo paciente
  const postPaciente = async (UserToken: string, nomePaciente: string, sobrenomePaciente: string): Promise<number> => {
    return PacienteService.postPaciente(UserToken, nomePaciente, sobrenomePaciente);
  };

  // Buscar lista de pacientes
  const getPacientes = async (UserToken: string): Promise<number> => {
    return PacienteService.getPacientes(UserToken);
  };

  // Editar um paciente
  const putPaciente = async (UserToken: string, pacienteId: string, nomePaciente: string, sobrenomePaciente: string): Promise<number> => {
    return PacienteService.putPaciente(UserToken, pacienteId, nomePaciente, sobrenomePaciente);
  };

  // Remover um paciente
  const deletePaciente = async (UserToken: string, pacienteId: string): Promise<number> => {
    return PacienteService.deletePaciente(UserToken, pacienteId);
  };

  // Remove o paciente selecionado
  const clearPaciente = async (): Promise<number> => {
    try {
      await AsyncStorage.removeItem('currentPacienteId');
      setCurrentPacienteId(null);
      return 1;
    } catch (error) {
      console.log('Erro ao limpar o paciente selecionado:', error);
      return -1;
    }
  };

  return (
    <PacienteContext.Provider
      value={{
        currentPacienteId,
        selectPaciente,
        clearPaciente,
        postPaciente,
        getPacientes,
        putPaciente,
        deletePaciente,
      }}
    >
      {children}
    </PacienteContext.Provider>
  );
};