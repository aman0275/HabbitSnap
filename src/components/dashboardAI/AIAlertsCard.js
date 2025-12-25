import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "../../utils/colors";
import { BORDER_RADIUS, SPACING, SHADOWS, TYPOGRAPHY } from "../../constants/theme";

const AIAlertsCard = ({ riskAlerts }) => {
  const COLORS = useColors();
  const styles = createStyles(COLORS);
  
  if (!riskAlerts || riskAlerts.total === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      {riskAlerts.urgent.slice(0, 2).map((alert, index) => (
        <View key={index} style={styles.alert}>
          <Ionicons name={alert.icon} size={20} color={COLORS.error} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>
              {alert.habitName}: {alert.title}
            </Text>
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  title: {
    ...TYPOGRAPHY.h5,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  alert: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.error + "15",
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
  },
  alertContent: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  alertTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs / 2,
  },
  alertMessage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
});

export default AIAlertsCard;


