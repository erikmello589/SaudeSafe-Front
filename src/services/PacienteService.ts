// Arquivo: src/services/pacienteService.ts

const API_BASE_URL = 'http://10.0.2.2:8080';

// Função para criar um novo paciente
export const postPaciente = async (UserToken: string, nomePaciente: string, sobrenomePaciente: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/paciente`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserToken}`,
      },
      body: JSON.stringify({ nomePaciente, sobrenomePaciente }),
    });

    if (response.status !== 201) return 0; // Erro na criação

    const data = await response.json();
    console.log(data);
    return 1; // Paciente criado com sucesso
  } catch (error) {
    console.log('Erro ao criar paciente:', error);
    return -1; // Erro inesperado
  }
};

// Função para buscar a lista de pacientes
export const getPacientes = async (UserToken: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pacientes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserToken}`,
      },
    });

    if (response.status !== 200) return 0; // Erro na busca

    const data = await response.json();
    console.log(data);
    return 1; // Pacientes consultados com sucesso
  } catch (error) {
    console.log('Erro ao buscar pacientes:', error);
    return -1;
  }
};

// Função para editar um paciente
export const putPaciente = async (UserToken: string, pacienteId: string, nomePaciente: string, sobrenomePaciente: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/paciente/${pacienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserToken}`,
      },
      body: JSON.stringify({ nomePaciente, sobrenomePaciente }),
    });

    if (response.status !== 200) return 0; // Erro na edição

    const data = await response.json();
    console.log(data);
    return 1; // Paciente editado com sucesso
  } catch (error) {
    console.log('Erro ao editar paciente:', error);
    return -1;
  }
};

// Função para remover um paciente
export const deletePaciente = async (UserToken: string, pacienteId: string): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/paciente/${pacienteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${UserToken}`,
      },
    });

    if (response.status !== 200) return 0; // Erro na remoção

    console.log(`Paciente ${pacienteId} removido.`);
    return 1; // Paciente removido com sucesso
  } catch (error) {
    console.log('Erro ao remover paciente:', error);
    return -1;
  }
};
