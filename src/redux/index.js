import { createStore, combineReducers, applyMiddleware } from "redux";
import { profileReducer } from "./redusers/profile";
import thunk from "redux-thunk";
import { accountReducer } from "./redusers/account";

const rootReducer = combineReducers({
  profile: profileReducer,
  account: accountReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
