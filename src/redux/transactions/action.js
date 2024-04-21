import { delay } from "@/utils";
import {
  generateTransaction,
  getTransactions,
  saveTransactions,
} from "@/utils/transaction";

export const initial = (value) => {
  return {
    type: "transactions/initial",
    payload: {
      value,
    },
  };
};

export const deposit = (value) => {
  return {
    type: "transactions/deposit",
    payload: {
      value,
    },
  };
};

export const withdraw = (value) => {
  return {
    type: "transactions/withdraw",
    payload: {
      value,
    },
  };
};

export const purge = (value) => {
  return {
    type: "transactions/purge",
    payload: {
      value,
    },
  };
};

export const reset = () => {
  return {
    type: "transactions/reset",
  };
};

const cancel = () => {
  return {
    type: "transactions/cancel",
  };
};

export const asyncDeposit = (value) => {
  return async (dispatch, getState) => {
    const { transactions } = getState();

    try {
      dispatch(deposit(value));
      await delay(1000);

      saveTransactions([
        ...transactions,
        generateTransaction("deposit", value),
      ]);
    } catch (error) {
      dispatch(cancel());
    }
  };
};

export const asyncWithdraw = (value) => {
  return async (dispatch, getState) => {
    const { transactions } = getState();

    try {
      dispatch(withdraw(value));
      await delay(1000);

      saveTransactions([
        ...transactions,
        generateTransaction("withdraw", value),
      ]);
    } catch (error) {
      dispatch(cancel());
    }
  };
};

export const asyncPurge = (value) => {
  return async (dispatch, getState) => {
    const { transactions } = getState();

    try {
      dispatch(purge(value));
      await delay(1000);

      saveTransactions([...transactions, generateTransaction("purge", value)]);
    } catch (error) {
      dispatch(cancel());
    }
  };
};

export const asyncInitial = () => {
  return async (dispatch) => {
    await delay(1000);

    const initialTransactions = getTransactions();
    dispatch(initial(initialTransactions));
  };
};

export const asyncReset = () => {
  return async (dispatch) => {
    await delay(1000);
    dispatch(reset());
  };
};
