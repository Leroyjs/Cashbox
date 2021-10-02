import { SET_ACTIVE_USER, SET_NEW_EMPLOYEE_DATA } from "../types";

const initialState = false;

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        employeeData: action.payload.employee_data[0],
        transactionSumByMonth: action.payload.transaction_money_sum_by_month,
        history: action.payload.history,
        id: action.payload.id,
      };
    case SET_NEW_EMPLOYEE_DATA:
      return { ...state, employeeData: action.payload[0] };

    default:
      return state;
  }
  return state;
};
