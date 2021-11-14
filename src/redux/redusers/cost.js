import { SET_COST } from "../types";

const initialState = 0;

export const costReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COST:
      return action.payload;

    default:
      return state;
  }
};
