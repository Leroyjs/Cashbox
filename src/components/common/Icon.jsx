import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const iconDictionary = {
  wait: require("../../media/wait.png"),
  waitError: require("../../media/waitError.png"),
  ok: require("../../media/ok.png"),
  error: require("../../media/error.png"),
};

export const Icon = ({ icon, color }) => {
  const colorStyles = {
    backgroundColor: color || "#EBEBEB",
  };

  return (
    <View style={{ ...styles.wrapper, ...colorStyles }}>
      {icon && <Image style={styles.img} source={iconDictionary[icon]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    width: 114,
    height: 114,
  },
  img: {
    width: 72,
    height: 72,
  },
});
