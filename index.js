import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ServiceAPI,
  IntegrationServiceEventType,
  Intent,
  ReceiptAPI,
  ReceiptDiscountEventResult,
} from "evotor-integration-library";

import App from "./App";
import { call } from "react-native-reanimated";
const errorHandler = (event) => (error) => console.log(event + error.message);
const receiptDiscountListener = async (discount, receiptUuid, callback) => {
  const receipt = await ReceiptAPI.getReceiptByUuid(receiptUuid);
  const cost =
    receipt
      .getPositions()
      .map((p) => p.price * p.quantity)
      .reduce((acc, v) => acc + v, 0) || 0;
  try {
    const discount = parseInt(await AsyncStorage.getItem("discount")) || 0;

    await callback.startActivity(
      new Intent()
        .setClassName("ru.tizol.cashbox.MainActivity")
        .putExtra("receiptUuid", receiptUuid)
        .putExtra("discount", discount)
        .putExtra("receiptCost", cost)
    );

    await callback.onResult(new ReceiptDiscountEventResult(discount, null, []));
  } catch (err) {
    errorHandler(IntegrationServiceEventType.RECEIPT_DISCOUNT)(err);
  }
};
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
ServiceAPI.addEventListener(
  IntegrationServiceEventType.RECEIPT_DISCOUNT,
  receiptDiscountListener
);
registerRootComponent(App);
