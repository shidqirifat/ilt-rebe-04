import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "./transactions/slice";

const store = configureStore({
  reducer: {
    transactions: transactionsSlice,
  },
});

export default store;
