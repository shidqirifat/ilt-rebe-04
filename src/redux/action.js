// @TODO create actions for savings state here
export function deposit(value) {
  return {
    type: "balances/deposit",
    payload: { value },
  };
}

export function withdraw(value) {
  return {
    type: "balances/withdraw",
    payload: { value },
  };
}

export function purge() {
  return {
    type: "balances/purge",
  };
}
