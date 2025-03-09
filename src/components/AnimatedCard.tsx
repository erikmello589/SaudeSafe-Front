import * as React from "react";
import { MotiView } from "moti";
import { Card, Text, useTheme } from "react-native-paper";

interface AnimatedCardProps {
  title: string;
  description: string;
  height: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, height }) => {
  const theme = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{
        opacity: { type: "timing", duration: 250 },
        translateX: { type: "timing", duration: 250 },
      }}
      style={{ alignSelf: "center", width: "90%", height, marginTop: "2%" }}
    >
      <Card style={{ flex: 1, borderRadius: 20, justifyContent: "center", padding: 20, elevation: 5, backgroundColor: theme.colors.primary }}>
        <Card.Content>
          <Text variant="titleLarge" style={{ color: theme.colors.onPrimary, fontSize: 22, fontWeight: "bold", textAlign: "center" }}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onPrimary, fontSize: 16, textAlign: "center", marginTop: 10 }}>
            {description}
          </Text>
        </Card.Content>
      </Card>
    </MotiView>
  );
};

export default AnimatedCard;
