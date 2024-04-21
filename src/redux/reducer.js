// @TODO create balances reducer here
export default function balancesReducer(prevState = 0, action) {
  if (action.type === "balances/deposit") {
    return prevState + action.payload.value;
  }

  if (action.type === "balances/withdraw") {
    return prevState - action.payload.value;
  }

  if (action.type === "balances/purge") {
    return 0;
  }

  return prevState;
}
