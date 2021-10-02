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

const plus = require("../../media/plus.png");
const minus = require("../../media/minus.png");

export const InputCountSection = ({ value, onChange, name }) => {
  function onInc() {
    onChange("" + (+value + 1));
  }
  function onDec() {
    if (value - 1 >= 0) {
      onChange("" + (+value - 1));
    }
  }
  return (
    <View>
      <TitleSection title={"Кол-во " + name.toLowerCase() + ", порция"} />
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.button} onPress={onDec}>
          <Image style={{ ...styles.icon, height: 3 }} source={minus} />
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType="number-pad"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={onInc}>
          <Image style={styles.icon} source={plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#999",
    textAlign: "center",
    paddingHorizontal: isMobile ? 18 : 24,
    paddingVertical: isMobile ? 14 : 22,
    borderRadius: isMobile ? 6 : 10,
    fontSize: isMobile ? 20 : 28,
  },
  inputWrapper: {
    flexDirection: "row",
  },
  button: {
    width: isMobile ? 60 : 78,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
