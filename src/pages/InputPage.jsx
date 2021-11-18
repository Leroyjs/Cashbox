import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/general/Loader";
import { BackTitleSection } from "../components/sections/BackTitleSection";
import { InfoSection } from "../components/sections/InfoSection";
import { InputCountSection } from "../components/sections/InputCountSection";
import { InputSection } from "../components/sections/InputSection";
import { Button } from "../components/ui/Button";
import { setNewEmployeeData } from "../redux/actions/profile";

const isMobile = true;

export const InputPage = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);
  const cost = useSelector((state) => state.cost);
  const [isLoaded, setLoaded] = useState(true);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [sum, setSum] = useState(cost.toString());
  const [sumError, setSumError] = useState(false);
  const [count, setCount] = useState("0");
  const isDefault = !+cost;

  function handleBack() {
    navigation.goBack();
  }
  async function handleSuccess() {
    setLoaded(false);
    const data = await sendTransaction(profile.id, sum, count);
    if (data) {
      setLoaded(true);
      dispatch(setNewEmployeeData(data));
      navigation.navigate("Done");
    } else {
      setLoaded(true);
      navigation.navigate("Error");
    }
  }
  function handleSubmit() {
    let error = false;
    if (+profile.employeeData.account.current_balance < sum) {
      error = `На счете не хватает: ${
        sum - profile.employeeData.account.current_balance
      } ₽`;
    }
    if (!sum) {
      error = "Поле обязательно для заполнения";
    }
    if (!error) {
      handleSuccess();
    }
    setSumError(error);
  }
  function handleSumChange(text) {
    setSum((+text).toString());
  }
  function handleCountChange(text) {
    setCount("" + +text.replace(/[^0-9]/g, ""));
  }

  async function sendTransaction(id, amount, additionalGood) {
    let data = false;
    const newAmount = +amount.replace(/,/, ".");
    const newAmountAdditionalGood = +additionalGood.replace(/,/, ".");

    await axios
      .put(
        `${account.adress}/api/proceed_transaction/`,
        {
          rfid_id: id.toString(),
          money_amount: newAmount,
          additional_good_amount: newAmountAdditionalGood,
        },
        {
          headers: { "X-Custom-Auth": "bearer " + account.token },
        }
      )
      .then(function (response) {
        // handle success
        data = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    return data;
  }
  return (
    <View style={styles.mainWrappe}>
      {isLoaded ? (
        <>
          <View>
            <BackTitleSection onPress={handleBack} />
            <InputSection
              error={sumError}
              value={sum}
              isDisabled={!isDefault}
              title="Сумма"
              placeholder="Сумма заказа"
              keyboardType="number-pad"
              onChange={handleSumChange}
            />
            <InputCountSection
              name={profile.employeeData.account.additional_goods.name}
              value={count}
              onChange={handleCountChange}
            />
          </View>
          <View>
            <InfoSection
              additional={profile.employeeData.account.additional_goods}
              currentBalance={profile.employeeData.account.current_balance}
            />
            <Button onPress={handleSubmit}>ОПЛАТИТЬ</Button>
          </View>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrappe: {
    padding: isMobile ? 16 : 24,
    height: "100%",
    paddingTop: (isMobile ? 16 : 24) + StatusBar.currentHeight,
    justifyContent: "space-between",
    flex: 1,
  },
});
