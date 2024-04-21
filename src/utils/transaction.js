export const saveTransactions = (transactions) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const getTransactions = () => {
  return JSON.parse(localStorage.getItem("transactions") || []);
};

export const generateTransaction = (type, amount) => {
  const date = new Date();
  return {
    id: +date,
    type,
    amount,
    date: date.toISOString(),
  };
};
