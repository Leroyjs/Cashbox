import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { InputSection } from "../components/sections/InputSection";
import { Button } from "../components/ui/Button";
import { config } from "../config";
import { logIn } from "../redux/actions/account";

const isMobile = true;

export const AuthorizationPage = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState(config.domain);
  const [errors, setErrors] = useState(false);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      navigation.navigate({ routeName: "Waiting" });
    }
  }, [account]);

  async function handleSuccess() {
    const data = await Authorization(login, password, adress);

    if (!data) {
      setErrors("Неправильный логин, адрес сервера или пароль");
    } else {
      await storeData({ ...data, adress });
      dispatch(logIn({ ...data, adress }));
      setLogin("");
      setPassword("");
      setAdress("");
      setErrors(false);
    }
  }
  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.title}>Авторизация</Text>
          <InputSection
            error={errors}
            value={login}
            onChange={setLogin}
            title="Логин"
            placeholder="Введите логин"
          />
          <InputSection
            error={errors ? true : false}
            value={password}
            onChange={setPassword}
            title="Пароль"
            placeholder="Введите пароль"
            isPassword={true}
          />
          <InputSection
            error={errors}
            value={adress}
            onChange={setAdress}
            title="Адрес сервера"
            placeholder="Введите адрес"
          />
        </View>
      </ScrollView>
      <Button onPress={handleSuccess}>ВОЙТИ</Button>
    </View>
  );
};

async function Authorization(email, password, adress) {
  let data = false;
  let configAxios = {
    headers: {
      Authorization: "tizol",
    },
  };
  await axios
    .post(
      `${adress}/api/login`,
      {
        email,
        password,
      },
      configAxios
    )
    .then(function (response) {
      // handle success
      data = response.data;
    })
    .catch(function (error) {
      // handle error
    })
    .then(function () {
      // always executed
    });
  return data;
}
const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@storage_Key", jsonValue);
  } catch (e) {
    // saving error
  }
};
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
  mainWrapper: {
    padding: isMobile ? 16 : 24,
    height: "100%",
    paddingTop: (isMobile ? 16 : 24) + StatusBar.currentHeight,
    justifyContent: "space-between",
  },
  title: {
    fontSize: isMobile ? 24 : 38,
    fontWeight: "bold",
  },
});
