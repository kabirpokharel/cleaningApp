import {
  LOAD_MENU_FROM_SERVER,
  ITEM_QUANTITY_CHANGE,
  REMOVE_ITEM,
} from "./reducers/actionTypes";

// ****************menu action creater s ******************

export const signinUser = (enteredEmailPassword) => {
  return {
    type: SIGN_IN,
    payload: enteredEmailPassword,
  };
};

export const itemQuantityChange = (id, quantity) => {
  return {
    type: ITEM_QUANTITY_CHANGE,
    payload: { id, quantity },
  };
};

export const removeItem = (id) => {
  return {
    type: REMOVE_ITEM,
    payload: id,
  };
};
