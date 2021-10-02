import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useFocusEffect } from "react-navigation-hooks";
import { Icon } from "../components/common/Icon";

const isMobile = true;

export const ErrorPage = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        navigation.navigate("Waiting");
      }, 3000);
    }, [])
  );
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.contentWrapper}>
        <Icon icon={"error"} color={"#F94A21"} />
        <Text style={styles.mainText}>Ошибка</Text>
        <Text style={styles.subText}>Попробуйте снова позже</Text>
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
  subText: {
    fontSize: isMobile ? 18 : 28,
    marginTop: isMobile ? 18 : 28,
  },
});
