import React from "react";
import { StyleSheet, Text, View } from "react-native";

const isMobile = true;

export const HistoryItem = ({
  date,
  moneyAmount,
  additionalAmount,
  type,
  units,
}) => {
  const color = moneyAmount > 0 ? "#13923C" : "#F94A21";
  const value =
    (+moneyAmount !== 0 ? +moneyAmount + " ₽" : "") +
    (+moneyAmount !== 0 && +additionalAmount !== 0 ? ", " : "") +
    (+additionalAmount !== 0 ? +additionalAmount + " " + units : "");
  return (
    <View style={styles.historyItem}>
      <View style={styles.historyItemLeftSide}>
        <View style={styles.historyItemDate}>
          <Text style={styles.historyItemDateText}>{date}</Text>
        </View>
        <Text style={styles.historyItemText}>{type}</Text>
      </View>
      <Text style={{ ...styles.historyItemCost, color }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    paddingVertical: isMobile ? 14 : 18,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  historyItemDate: {
    width: isMobile ? 80 : 100,
  },
  historyItemText: {
    fontSize: isMobile ? 12 : 18,
  },
  historyItemDateText: {
    fontSize: isMobile ? 12 : 18,
    opacity: 0.2,
  },
  historyItemCost: {
    fontWeight: "bold",
    fontSize: isMobile ? 14 : 20,
  },
  historyItemLeftSide: {
    flexDirection: "row",
    alignItems: "center",
  },
});
