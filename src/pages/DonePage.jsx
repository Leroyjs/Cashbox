import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, BackHandler } from "react-native";
import { useFocusEffect } from "react-navigation-hooks";
import { useSelector } from "react-redux";
import { Icon } from "../components/common/Icon";

const isMobile = true;

export const DonePage = ({ navigation }) => {
  const employeeData = useSelector((state) => state.profile.employeeData);
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        // navigation.navigate("Waiting");
        BackHandler.exitApp();
      }, 3000);
    }, [])
  );
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>
        <Icon icon={"ok"} color={"#13923C"} />
        <Text style={styles.mainText}>Оплата прошла успешно</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.name}>
          {employeeData
            ? `${employeeData.first_name} ${employeeData.last_name} ${employeeData.patronymic_name}`
            : "Неизвестно"}
        </Text>
        <View style={styles.row}>
          <Text style={styles.titleValue}>
            Остаток {employeeData.account.additional_goods.name.toLowerCase()}:
          </Text>
          <Text style={styles.value}>
            {+employeeData.account.additional_goods.amount}{" "}
            {employeeData.account.additional_goods.units}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.titleValue}>Остаток средств:</Text>
          <Text style={styles.value}>
            {employeeData.account.current_balance} ₽
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
  },
  contentWrapper: { marginTop: 150, alignItems: "center" },
  mainText: {
    textAlign: "center",
    marginTop: 40,
    fontWeight: "bold",
    fontSize: isMobile ? 28 : 38,
  },
  textWrapper: {
    marginTop: isMobile ? 60 : 80,
    width: "100%",
    paddingHorizontal: isMobile ? 16 : 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: isMobile ? 12 : 20,
  },
  name: {
    fontSize: isMobile ? 16 : 24,
    fontWeight: "bold",
    marginBottom: isMobile ? 20 : 30,
  },
  value: {
    fontWeight: "bold",
    fontSize: isMobile ? 14 : 20,
  },
  titleValue: {
    fontSize: isMobile ? 14 : 20,
  },
});
