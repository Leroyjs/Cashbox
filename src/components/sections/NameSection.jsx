import React from "react";
import { StyleSheet, Text, View } from "react-native";

const isMobile = true;

export const NameSection = ({ name }) => {
  return (
    <View style={styles.blockWrapper}>
      <Text style={styles.profileNameText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    backgroundColor: "#fff",
    borderRadius: isMobile ? 6 : 10,
    padding: isMobile ? 12 : 20,
    // alignItems: "center",
  },
  profileNameText: {
    fontSize: isMobile ? 16 : 22,
    // textAlign: "center",
  },
});
