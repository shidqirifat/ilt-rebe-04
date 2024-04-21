import { deposit, withdraw, purge } from "./action.js";
import { default as balancesReducer } from "./reducer.js";

// @TODO create store here
function createStore(reducer) {
  /**
   * Store memiliki 4 hal
   * 1. State DONE!
   * 2. Mendapatkan state DONE!
   * 3. Men-subscribe perubahan state DONE!
   * 4. Memperbarui state DONE!
   */

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((item) => item !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

(() => {
  const store = createStore(balancesReducer);

  store.subscribe(() => {
    const balance = store.getState();
    console.log("balance", balance);
  });

  store.dispatch(deposit(100));
  store.dispatch(withdraw(20));
  store.dispatch(deposit(10));
  store.dispatch(withdraw(50));
  store.dispatch(purge());
})();
