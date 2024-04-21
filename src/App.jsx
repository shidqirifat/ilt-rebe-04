import { useMemo } from "react";
import useInputCurrency from "./hooks/useInputCurrency";
import { formatNumber } from "./utils/currency";
import Balanced from "./components/transaction/Balanced";
import FormTransaction from "./components/transaction/FormTransaction";
import Transaction from "./components/transaction/Transaction";
import { Button } from "./components/ui/button";
import { ListRestart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, purge, reset, withdraw } from "./redux/transactions/action";

function App() {
  const { error, amount, setError, onChangeAmount, onResetAmount } =
    useInputCurrency();
  const transactions = useSelector((store) => store.transactions);

  const dispatch = useDispatch();

  const balanced = useMemo(() => {
    return transactions.reduce((prev, curr) => {
      if (curr.type === "deposit") return (prev += curr.amount);
      else return (prev -= curr.amount);
    }, 0);
  }, [transactions]);

  const addTransaction = (type) => {
    const numberAmount = formatNumber(amount);
    if (type === "deposit") onDeposit(numberAmount);
    else if (type === "withdraw") onWithdraw(numberAmount);
    else onPurge();
  };

  const clearAmountAndError = () => {
    setError(null);
    onResetAmount();
  };

  const onDeposit = (numberAmount) => {
    if (numberAmount === 0) {
      setError("Amount can not be zero");
      return;
    }

    dispatch(deposit(numberAmount));
    clearAmountAndError();
  };

  const onWithdraw = (numberAmount) => {
    if (numberAmount === 0) {
      setError("Amount can not be zero");
      return;
    }
    if (balanced < numberAmount) {
      setError("Your balance is not enough");
      return;
    }

    dispatch(withdraw(numberAmount));
    clearAmountAndError();
  };

  const onPurge = () => {
    if (balanced === 0) {
      setError("Your balanced is zero");
      return;
    }

    dispatch(purge(balanced));
    clearAmountAndError();
  };

  const resetTransaction = () => {
    dispatch(reset());
  };

  return (
    <>
      <header className="bg-slate-100 shadow">
        <div className="mx-auto max-w-4xl p-4">
          <h1 className="text-2xl font-bold leading-6 text-slate-700">
            Catat Uang 💵
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-4xl my-6 px-4">
        <div>
          <Balanced>{balanced}</Balanced>

          <FormTransaction
            error={error}
            value={amount}
            onChange={onChangeAmount}
            addTransaction={addTransaction}
          />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-slate-700 font-semibold leading-5">
              History Transactions
            </h2>
            <Button
              variant="secondary"
              className="!p-0 rounded-full !w-10 !h-10"
              onClick={resetTransaction}
            >
              <ListRestart width={22} height={22} />
            </Button>
          </div>

          {transactions.length === 0 ? (
            <div className="grid place-content-center py-24">
              <img src="/assets/empty.png" alt="Empty Transaction" />
            </div>
          ) : (
            <div className="space-y-2 mt-2 pb-2 pr-4 overflow-y-auto h-[60vh] w-max">
              {transactions.map((transaction) => (
                <Transaction key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
