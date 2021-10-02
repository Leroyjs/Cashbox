import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const isMobile = true;

export const TitleSection = ({ title, subTitle, subTitlePress }) => {
  return (
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={subTitlePress} style={styles.subTitleWrapper}>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: isMobile ? 18 : 24,
  },
  subTitle: {
    fontWeight: "400",
    fontSize: isMobile ? 14 : 20,
  },
  subTitleWrapper: {
    height: isMobile ? 20 : 24,
    position: "relative",
    zIndex: 999,
  },
  titleWrapper: {
    marginTop: isMobile ? 20 : 32,
    marginBottom: isMobile ? 12 : 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
