import { LOG_IN, LOG_OUT } from "../types";

function logIn(accountData) {
  console.log(accountData);
  return {
    type: LOG_IN,
    payload: accountData,
  };
}

function logOut() {
  return {
    type: LOG_OUT,
  };
}

export { logIn, logOut };
