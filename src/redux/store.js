import transactionsReducer from "./transactions/reducer";
import { legacy_createStore } from "redux";

const root = (state = {}, action = {}) => {
  return {
    transactions: transactionsReducer(state.transactions, action),
  };
};

const store = legacy_createStore(root);

export default store;
