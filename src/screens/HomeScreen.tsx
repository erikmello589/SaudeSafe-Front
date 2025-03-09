import * as React from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card, Text, useTheme, Avatar, Button } from "react-native-paper";
import { MotiView } from "moti";
import { useAuth } from '../context/AuthContext';

const { height } = Dimensions.get("window");
const CalendarIcon = (props: any) => <Avatar.Icon {...props} icon="calendar" />;
const FileIcon = (props: any) => <Avatar.Icon {...props} icon="folder-multiple-plus" />;
const UserIcon = (props: any) => <Avatar.Icon {...props} icon="account-supervisor-circle" />;

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();
  const theme = useTheme(); // Obtém o tema atual

  const handleLogout = async () => {
    const result = await logout();
    if (result === 1) {
      navigation.replace('Register'); // Redireciona para a Home ao logar
    } else {
      console.log('Erro ao sair da conta.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MotiView
        from={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{
          opacity: { type: "timing", duration: 250 },
          translateX: { type: "timing", duration: 250 },
        }}
        style={styles.animatedCard}
      >
        <Card style={[styles.card, { backgroundColor: theme.colors.primary }]}>
          <Card.Content>
            <Text variant="titleLarge" style={[styles.textTitle, { color: theme.colors.onPrimary }]}>
              Bem-Vindo ao SaúdeSafe!
            </Text>
            <Text variant="bodyMedium" style={[styles.textBody, { color: theme.colors.onPrimary }]}>
              Armazene sua documentação médica com facilidade e segurança bem na palma da sua mão!
            </Text>
          </Card.Content>
        </Card>
      </MotiView>

      <View style={styles.cardsContainer}>
        <Card style={styles.secondCard}>
          <Card.Title 
            title="Salve ou Agende Consultas" 
            left={CalendarIcon} 
            titleStyle={styles.secondCardTitle} 
          />
          <Card.Content style={{ alignItems: 'center' }}>
            <Text variant="bodyMedium">
              E todas as suas informações fundamentais, como o Profissional que te atendeu e a clínica!
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.secondCard}>
          <Card.Title 
            title="Anexe imagens ou arquivos" 
            left={FileIcon} 
            titleStyle={styles.secondCardTitle} 
          />
          <Card.Content style={{ alignItems: 'center' }}>
            <Text variant="bodyMedium">
              De documentos importantes para o seu acompanhamento como paciente, como Atestados médicos, Receitas e Pedido de Exames!
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.secondCard}>
          <Card.Title 
            title="Organize dados em perfis" 
            left={UserIcon} 
            titleStyle={styles.secondCardTitle} 
          />
          <Card.Content style={{ alignItems: 'center' }}>
            <Text variant="bodyMedium">
              Para dependentes como familiares ou até mesmo pessoas próximas e visualize as estatísticas de visitas a ambientes de saúde com quadros e gráficos em destaque!
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Button mode="contained" onPress={() => navigation.replace('Register')} style={styles.button}>
        COMECE JÁ!
      </Button>

      <Button mode="contained" onPress={() => logout()} style={styles.button}>
        LogOut!
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que o conteúdo cresça além da altura da tela
    paddingBottom: 40, // Adiciona um pouco de espaço na parte inferior
  },
  animatedCard: {
    alignSelf: "center",
    width: "90%",
    height: height * 0.25,
    marginTop: "2%", // Margem superior para o primeiro card
  },
  card: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    padding: 20,
    elevation: 5,
  },
  cardsContainer: {
    alignItems: "center",
    marginTop: 5, // Espaçamento entre o primeiro card e os outros
  },
  secondCard: {
    width: "90%",
    marginTop: 20, // Adicionando margem entre os cards
  },
  textTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  textBody: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  secondCardTitle: {
    fontSize: 20, // Tamanho maior para o título do segundo card
    fontWeight: "bold", // Em negrito
  },
  button: {
    width: "65%",
    alignSelf: "center",
    marginTop: 20, // Margem superior para o botão
  },
});
