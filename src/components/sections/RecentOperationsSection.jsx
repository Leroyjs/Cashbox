import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { HistoryItem } from "../common/HistoryItem";
import { TitleSection } from "./TitleSection";

const isMobile = true;

export const RecentOperationsSection = ({ list, units }) => {
  const { navigate } = useNavigation();
  function handlePress() {
    navigate("History");
  }
  console.log(units);
  return (
    <>
      <TitleSection
        title="Недавние операции"
        subTitlePress={handlePress}
        subTitle={list.length >= 5 ? "Подробнее" : false}
      />
      <View style={styles.blockWrapper}>
        {list.map(
          (item, index) =>
            index <= 3 && (
              <React.Fragment key={index}>
                <HistoryItem
                  date={item.transaction_date}
                  type={item.transaction_type}
                  units={units}
                  moneyAmount={item.money_amount}
                  additionalAmount={item.additional_amount}
                />
                {list.length - 1 !== index && index !== 3 && (
                  <View style={styles.line} />
                )}
              </React.Fragment>
            )
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blockWrapper: {
    backgroundColor: "#fff",
    borderRadius: isMobile ? 6 : 10,
    padding: isMobile ? 12 : 20,
    paddingVertical: 0,
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    opacity: 0.1,
  },
});
