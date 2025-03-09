import * as React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { MotiView } from "moti";
import { useAuth } from '../context/AuthContext';
import AnimatedCard from '../components/AnimatedCard';
import InfoCard from '../components/InfoCard';

const { height } = Dimensions.get("window");

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result === 1) {
      navigation.replace('Register');
    } else {
      console.log('Erro ao sair da conta.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnimatedCard 
        title="Bem-Vindo ao SaúdeSafe!" 
        description="Armazene sua documentação médica com facilidade e segurança bem na palma da sua mão!"
        height={height * 0.25}
      />

      <InfoCard 
        title="Salve ou Agende Consultas" 
        icon="calendar" 
        description="E todas as suas informações fundamentais, como o Profissional que te atendeu e a clínica!"
      />

      <InfoCard 
        title="Anexe imagens ou arquivos" 
        icon="folder-multiple-plus" 
        description="De documentos importantes para o seu acompanhamento como paciente, como Atestados médicos, Receitas e Pedido de Exames!"
      />

      <InfoCard 
        title="Organize dados em perfis" 
        icon="account-supervisor-circle" 
        description="Para dependentes como familiares ou até mesmo pessoas próximas e visualize as estatísticas de visitas a ambientes de saúde com quadros e gráficos em destaque!"
      />

      <Button mode="contained" onPress={() => navigation.replace('Register')} style={styles.button}>
        COMECE JÁ!
      </Button>

      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        LogOut!
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  button: {
    width: "65%",
    alignSelf: "center",
    marginTop: 20,
  },
});