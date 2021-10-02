import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TitleSection } from "./TitleSection";

const isMobile = true;

export const BalanceSection = ({
  currentBalance,
  transactionSumByMonth,
  additional,
}) => {
  return (
    <>
      <TitleSection title="Баланс" />
      <View style={styles.blockWrapper}>
        <View style={styles.mainRow}>
          <View>
            <Text style={styles.subTitle}>Остаток средств:</Text>
            <Text style={styles.mainText}>{+currentBalance} ₽</Text>
          </View>
          <View style={styles.separator}></View>
          <View>
            <Text style={styles.subTitle}>
              {additional.name[0].toUpperCase() + additional.name.slice(1)}{" "}
              доступно:
            </Text>
            <Text style={styles.mainText}>
              {+additional.amount} {additional.units}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.subTitle}>Потрачено за последний месяц:</Text>
          <Text style={styles.cost}>{-transactionSumByMonth} ₽</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    backgroundColor: "#fff",
    borderRadius: isMobile ? 6 : 10,
    padding: isMobile ? 12 : 20,
    paddingVertical: 0,
    paddingTop: isMobile ? 12 : 20,
    // alignItems: "center",
  },
  subTitle: {
    fontWeight: "400",
    fontSize: isMobile ? 14 : 20,
    opacity: 0.5,
  },
  cost: {
    fontWeight: "bold",
    fontSize: isMobile ? 14 : 20,
  },
  mainText: {
    fontSize: isMobile ? 30 : 48,
    fontWeight: "bold",
    marginTop: isMobile ? 8 : 12,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#000",
    opacity: 0.1,
    marginHorizontal: isMobile ? 32 : 40,
  },
  mainRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: isMobile ? 20 : 32,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: isMobile ? 12 : 20,
  },
});
