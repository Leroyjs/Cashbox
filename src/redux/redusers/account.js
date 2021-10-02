import { LOG_IN, LOG_OUT } from "../types";

const initialState = false;

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return false;

    default:
      return state;
  }
};
