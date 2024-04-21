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

export const reset = (value) => {
  return {
    type: "transactions/reset",
    payload: {
      value,
    },
  };
};
