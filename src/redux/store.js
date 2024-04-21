import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./transactions/reducer";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});

export default store;
