import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const isMobile = true;

export const Button = ({ children, onPress, isGray }) => {
  const bgc = isGray ? { backgroundColor: "rgba(0, 0, 0, 0.1)" } : {};
  const color = isGray ? { color: "#000" } : { color: "#fff" };
  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.button, ...bgc }}>
      <Text style={{ ...styles.buttonText, ...color }}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: isMobile ? 18 : 28,
    marginTop: isMobile ? 18 : 24,
    backgroundColor: "#13923C",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: isMobile ? 6 : 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: isMobile ? 14 : 20,
  },
});
