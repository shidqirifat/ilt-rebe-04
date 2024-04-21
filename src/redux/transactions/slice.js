import { delay } from "@/utils";
import { generateTransaction, saveTransactions } from "@/utils/transaction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const asyncDepositSlice = createAsyncThunk(
  "transactions/asyncDepositSlice",
  async (value) => {
    await delay(1000);
    return value;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    history: [],
  },
  extraReducers: (builder) => {
    builder.addCase(asyncDepositSlice.pending, (state, action) => {
      const newTransaction = generateTransaction("deposit", action.meta.arg);
      state.history.push(newTransaction);
    });
    builder.addCase(asyncDepositSlice.fulfilled, (state) => {
      saveTransactions(state.history);
    });
    builder.addCase(asyncDepositSlice.rejected, (state) => {
      state.history.pop();
    });
  },
});

export default transactionsSlice.reducer;
