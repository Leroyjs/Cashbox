import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { WaitingPage } from "./pages/WaitingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { InputPage } from "./pages/InputPage";
import { DonePage } from "./pages/DonePage";
import { ErrorPage } from "./pages/ErrorPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AuthorizationPage } from "./pages/AuthorizationPage";
import store from "./redux";

const account = store.getState().account;

const Navigator = createStackNavigator(
  {
    Waiting: WaitingPage,
    Profile: ProfilePage,
    Input: InputPage,
    Done: DonePage,
    Error: ErrorPage,
    History: HistoryPage,
    Authorization: AuthorizationPage,
  },
  {
    initialRouteName: account ? "Waiting" : "Authorization",
    headerMode: "none",
  }
);

export const AppNavigation = createAppContainer(Navigator);
