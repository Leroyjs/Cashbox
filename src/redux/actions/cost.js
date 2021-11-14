import { SET_COST } from "../types";

function setCost(accountData) {
  return {
    type: SET_COST,
    payload: accountData,
  };
}

export { setCost };
