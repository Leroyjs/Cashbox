import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const isMobile = true;
const arrow = require("../../media/arrow-back.png");

export const BackTitleSection = ({ onPress }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.arrowWrapper} onPress={onPress}>
        <Image style={styles.arrow} source={arrow} />
      </TouchableOpacity>
      <Text style={styles.text}>Введите сумму заказа</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    width: isMobile ? 18 : 24,
    height: isMobile ? 16 : 20,
    marginRight: isMobile ? 16 : 22,
  },
  arrowWrapper: {
    justifyContent: "center",
    width: isMobile ? 28 : 32,
    height: isMobile ? 24 : 28,
  },
  text: {
    fontSize: isMobile ? 20 : 28,
    fontWeight: "bold",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: isMobile ? 14 : 24,
  },
});
