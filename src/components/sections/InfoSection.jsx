import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

const isMobile = true;

export const InfoSection = ({ additional, currentBalance }) => {
  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.subTitle}>
          Остаток {additional.name.toLowerCase()}:
        </Text>
        <Text style={styles.value}>
          {+additional.amount} {additional.units}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subTitle}>Остаток средств:</Text>
        <Text style={styles.value}>{currentBalance} ₽</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: isMobile ? 14 : 20,
  },
  value: {
    fontSize: isMobile ? 14 : 20,
    fontWeight: "bold",
  },
});
