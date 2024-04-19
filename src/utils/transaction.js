export const saveTransactions = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const getTransactions = () => {
  return JSON.parse(localStorage.getItem("transactions") || []);
};
