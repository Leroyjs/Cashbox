import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { AppNavigation } from "./src/AppNavigation";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logIn } from "./src/redux/actions/account";
import { setCost } from "./src/redux/actions/cost";

export default function App({
  receiptUuid = "",
  discount = 0,
  receiptCost = 0,
}) {
  useEffect(() => {
    async function getAccount() {
      store.dispatch(logIn(await getData()));
      store.dispatch(setCost(receiptCost + ""));
    }

    getAccount();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@account");
      // const jsonValue = null;
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
});
