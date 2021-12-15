import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { BackTitleSection } from "../components/sections/BackTitleSection";
import { BalanceSection } from "../components/sections/BalanceSection";
import { NameSection } from "../components/sections/NameSection";
import { RecentOperationsSection } from "../components/sections/RecentOperationsSection";
import { Button } from "../components/ui/Button";

const isMobile = true;

export const ProfilePage = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);

  function handleNext() {
    navigation.navigate("Input");
  }
  function handleBack() {
    navigation.goBack();
  }
  return (
    <View style={styles.mainWrappe}>
      <View style={styles.headerWrapper}>
        <BackTitleSection onPress={handleBack} />
      </View>
      <ScrollView>
        <View style={styles.inner}>
          <NameSection
            name={
              profile.employeeData
                ? `${profile.employeeData.first_name} ${profile.employeeData.last_name} ${profile.employeeData.patronymic_name}`
                : "Неизвестно"
            }
          />
          {profile.employeeData && (
            <BalanceSection
              additional={profile.employeeData.account.additional_goods}
              currentBalance={profile.employeeData.account.current_balance}
              transactionSumByMonth={profile.transactionSumByMonth}
            />
          )}
          {profile.history.length !== 0 && (
            <RecentOperationsSection
              units={profile.employeeData.account.additional_goods.units}
              list={profile.history}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        {/* <Button onPress={handleNext}>ВВЕСТИ СУММУ ЗАКАЗА</Button> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainWrappe: {
    height: "100%",
    paddingTop: (isMobile ? 16 : 24) + StatusBar.currentHeight,
    position: "relative",
  },
  inner: {
    padding: isMobile ? 16 : 24,
    paddingBottom: isMobile ? 86 : 143,
  },
  headerWrapper: {
    paddingHorizontal: isMobile ? 16 : 24,
  },
  buttonWrapper: {
    position: "absolute",
    width: "100%",
    padding: isMobile ? 16 : 24,
    paddingTop: 0,
    bottom: 0,
  },
});
const list = [
  {
    date: "23.08.2021",
    value: -100,
  },
  {
    date: "23.08.2021",
    value: -100,
  },
  {
    date: "23.08.2021",
    value: -100,
  },
  {
    date: "23.08.2021",
    value: -100,
  },
  {
    date: "23.08.2021",
    value: -100,
  },
];
