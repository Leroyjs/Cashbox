import React, { useState, useRef, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Icon } from "../components/common/Icon";
import { useFocusEffect, useIsFocused } from "react-navigation-hooks";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../redux/actions/profile";
import { Loader } from "../components/general/Loader";
import { Button } from "../components/ui/Button";
import { logOut } from "../redux/actions/account";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isMobile = true;

export const WaitingPage = ({ navigation }) => {
  const focusState = useIsFocused();
  const [hasError, setError] = useState(false);
  const [isLoaded, setLoaded] = useState(true);
  const [id, setId] = useState("");
  const color = hasError ? "#F94A21" : "#EBEBEB";
  const icon = hasError ? "waitError" : "wait";
  const input = useRef(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  useFocusEffect(
    useCallback(() => {
      setError(false);
      setLoaded(true);
      input.current.focus();
      return () => {
        input.current.blur();
      };
    }, [])
  );
  function handleLogOut() {
    dispatch(logOut());
    storeData(false);
    navigation.navigate({ routeName: "Authorization" });
  }
  async function handleSubmit() {
    let data;
    if (id) {
      setLoaded(false);
      data = await setUserById(id);
      setLoaded(true);
      if (data) {
        setError(false);
        dispatch(setActiveUser(data));
        navigation.navigate("Profile");
      }
    }
    setId("");
    focusState ? input.current.focus() : input.current.blur();
  }
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  async function setUserById(id) {
    let data = false;
    await axios
      .get(`${account.adress}/api/home?rfid_id=${id}`, {
        headers: { "X-ZALUPA": "tizol " + account.token },
      })
      .then(function (response) {
        // handle success
        data = response.data;
        data = { ...data, id };
      })
      .catch(function (error) {
        // handle error
        setError(error.response.data);
      })
      .then(function () {
        // always executed
      });
    return data;
  }
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={input}
          style={styles.input}
          autoFocus
          value={id}
          showSoftInputOnFocus={false}
          onChangeText={(text) => {
            setId(text);
          }}
          onBlur={handleSubmit}
        />
      </View>
      {isLoaded ? (
        <>
          <View style={styles.contentWrapper}>
            <Icon icon={icon} color={color} />
            <Text style={styles.mainText}>Приложите пропуск</Text>
            {hasError && <Text style={styles.error}>{hasError}</Text>}
          </View>
          <View style={styles.buttonWrapper}>
            <Button onPress={handleLogOut} isGray={true}>
              ВЫЙТИ ({account.name})
            </Button>
          </View>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    alignItems: "center",
  },
  contentWrapper: {
    marginTop: 100,
    alignItems: "center",
  },
  mainText: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: isMobile ? 28 : 38,
  },
  error: {
    marginTop: 18,
    textAlign: "center",
    paddingHorizontal: 28,
  },
  input: {
    backgroundColor: "#666",
  },
  buttonWrapper: {
    padding: isMobile ? 12 : 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  inputWrapper: {
    height: 1,
    width: 1,
    overflow: "hidden",
    opacity: 0,
    backgroundColor: "#f00",
  },
});
