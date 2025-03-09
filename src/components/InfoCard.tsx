import * as React from "react";
import { Card, Text, Avatar } from "react-native-paper";
import { StyleSheet, View } from "react-native";

interface InfoCardProps {
  title: string;
  icon: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, description }) => {
  const Icon = (props: any) => <Avatar.Icon {...props} icon={icon} />;

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Title title={title} left={Icon} titleStyle={styles.cardTitle} />
        <Card.Content style={styles.cardContent}>
          <Text variant="bodyMedium" style={styles.cardDescription}>
            {description}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center', // Centraliza o card horizontalmente
    marginTop: 20, // Espaçamento entre os cards
  },
  card: {
    width: '90%', // O card vai ocupar 90% da largura da tela
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    alignItems: 'center',
  },
  cardDescription: {
    textAlign: 'center',
  },
});

export default InfoCard;
