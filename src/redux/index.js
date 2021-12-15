import { createStore, combineReducers, applyMiddleware } from "redux";
import { profileReducer } from "./redusers/profile";
import thunk from "redux-thunk";
import { accountReducer } from "./redusers/account";
import { costReducer } from "./redusers/cost";

const rootReducer = combineReducers({
  profile: profileReducer,
  account: accountReducer,
  cost: costReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
