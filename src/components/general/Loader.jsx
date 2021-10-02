import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";

const isMobile = true;
const loaderImg = require("../../media/loader.png");

export const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    return () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).stop();
    };
  }, []);
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.wrapper}>
        <Animated.Image
          style={[styles.loaderImg, { transform: [{ rotate: spin }] }]}
          source={loaderImg}
        />
      </View>
      <Text style={styles.mainText}>Ожидайте</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
  },
  wrapper: {
    marginTop: 150,
  },
  loaderImg: {
    width: 114,
    height: 114,
  },
  mainText: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: isMobile ? 28 : 38,
  },
});
