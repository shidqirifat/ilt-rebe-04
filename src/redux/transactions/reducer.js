import { generateTransaction } from "@/utils/transaction";

const transactionsReducer = (transactions = [], action = {}) => {
  if (action.type === "transactions/initial") {
    return action.payload.value;
  }

  if (action.type === "transactions/deposit") {
    const newTransaction = generateTransaction("deposit", action.payload.value);
    return [...transactions, newTransaction];
  }

  if (action.type === "transactions/withdraw") {
    const newTransaction = generateTransaction(
      "withdraw",
      action.payload.value
    );
    return [...transactions, newTransaction];
  }

  if (action.type === "transactions/purge") {
    const newTransaction = generateTransaction("purge", action.payload.value);
    return [...transactions, newTransaction];
  }

  if (action.type === "transactions/cancel") {
    const newTransactions = [...transactions];
    newTransactions.pop();
    return newTransactions;
  }

  if (action.type === "transactions/reset") {
    return [];
  }

  return transactions;
};

export default transactionsReducer;
