import { SET_ACTIVE_USER, SET_NEW_EMPLOYEE_DATA } from "../types";

function setActiveUser(accountData) {
  return {
    type: SET_ACTIVE_USER,
    payload: accountData,
  };
}

function setNewEmployeeData(employeeData) {
  return {
    type: SET_NEW_EMPLOYEE_DATA,
    payload: employeeData,
  };
}

export { setActiveUser, setNewEmployeeData };
