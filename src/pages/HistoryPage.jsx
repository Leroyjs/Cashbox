import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { HistoryItem } from "../components/common/HistoryItem";
import { Loader } from "../components/general/Loader";
import { BackTitleSection } from "../components/sections/BackTitleSection";

const isMobile = true;

export const HistoryPage = ({ navigation }) => {
  const profile = useSelector((state) => state.profile);
  const account = useSelector((state) => state.account);
  const [isLoaded, setLoaded] = useState(false);

  const [months, setMonths] = useState({});
  useEffect(() => {
    async function loadHistory() {
      const data = await getHistory(profile.id);
      setLoaded(true);
      setMonths(data);
    }
    loadHistory();
  }, [profile.id]);
  function handleBack() {
    navigation.goBack();
  }
  const list = [];

  for (let month in months) {
    list.push({
      month,
      historyList: months[month],
    });
  }
  async function getHistory(id) {
    let data = false;
    await axios
      .get(`${account.adress}/api/history?rfid_id=${id}`, {
        headers: { "X-Custom-Auth": "bearer " + account.token },
      })
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
  return (
    <View style={styles.mainWrappe}>
      <View style={styles.headerWrapper}>
        <BackTitleSection onPress={handleBack} />
      </View>
      {isLoaded ? (
        <ScrollView wrapper={true} style={styles.scrollView}>
          <View style={styles.innerWrapper}>
            <View style={styles.inner}>
              {list.map((month, index) => (
                <View key={index}>
                  <View style={styles.monthWrapper}>
                    <Text style={styles.month}>{month.month}</Text>
                  </View>
                  <View style={styles.line} />
                  {month.historyList.map((item, index) => (
                    <React.Fragment key={index}>
                      <HistoryItem
                        date={item.transaction_date}
                        type={item.transaction_type}
                        units={
                          profile.employeeData.account.additional_goods.units
                        }
                        moneyAmount={item.money_amount}
                        additionalAmount={item.additional_amount}
                      />
                      {month.historyList.length - 1 !== index && (
                        <View style={styles.line} />
                      )}
                    </React.Fragment>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainWrappe: {
    flex: 1,
    paddingTop: (isMobile ? 16 : 24) + StatusBar.currentHeight,
    position: "relative",
  },
  scrollView: {
    paddingHorizontal: isMobile ? 16 : 24,
  },
  innerWrapper: {
    paddingBottom: isMobile ? 16 : 24,
  },
  inner: {
    paddingHorizontal: isMobile ? 16 : 24,
    backgroundColor: "#fff",
    borderRadius: isMobile ? 6 : 10,
  },
  month: {
    fontSize: isMobile ? 14 : 20,
    fontWeight: "bold",
  },
  monthWrapper: {
    paddingVertical: isMobile ? 14 : 18,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#000",
    opacity: 0.1,
  },
  headerWrapper: {
    paddingHorizontal: isMobile ? 16 : 24,
  },
});
