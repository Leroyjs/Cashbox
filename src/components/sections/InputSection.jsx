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
import { TitleSection } from "./TitleSection";

const isMobile = true;

export const InputSection = ({
  value,
  onChange,
  error,
  title,
  placeholder,
  keyboardType,
  isPassword,
}) => {
  return (
    <View style={styles.wrapper}>
      <TitleSection title={title} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={error ? { ...styles.input, ...styles.inputError } : styles.input}
        secureTextEntry={isPassword}
      />
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: isMobile ? 18 : 24,
    paddingVertical: isMobile ? 14 : 22,
    borderRadius: isMobile ? 6 : 10,
    fontSize: isMobile ? 20 : 28,
    color: "#000",
  },
  inputError: {
    borderColor: "#F94A21",
    color: "#F94A21",
  },
  errorWrapper: {
    position: "absolute",
    bottom: isMobile ? -14 : -22,
  },
  errorText: {
    color: "#F94A21",
    fontSize: isMobile ? 10 : 16,
  },
});
