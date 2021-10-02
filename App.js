import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { AppNavigation } from "./src/AppNavigation";
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logIn } from "./src/redux/actions/account";

export default function App() {
  useEffect(() => {
    async function getAccount() {
      store.dispatch(logIn(await getData()));
    }
    getAccount();
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigation />
      </View>
    </Provider>
  );
}
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
