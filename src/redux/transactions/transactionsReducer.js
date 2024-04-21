// @TODO create transaction reducer here
const transactionsReducer = (transactions = [], action = {}) => {
  switch (action.type) {
    case "transactions/initial":
      return action.payload.value;
    case "transactions/deposit":
      const transaction = generateTransaction("deposit", numberAmount);
      return action.payload.value;
    case "transactions/":
      return action.payload.value;
    default:
      return transactions;
  }
};
