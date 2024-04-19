import { useEffect, useMemo, useState } from "react";
import useInputCurrency from "./hooks/useInputCurrency";
import { formatNumber } from "./utils/currency";
import Balanced from "./components/transaction/Balanced";
import FormTransaction from "./components/transaction/FormTransaction";
import Transaction from "./components/transaction/Transaction";
import { Button } from "./components/ui/button";
import { ListRestart } from "lucide-react";
import { getTransactions, saveTransactions } from "./utils/transaction";

function App() {
  const { error, amount, setError, onChange, onReset } = useInputCurrency();
  const [transactions, setTransactions] = useState([]);

  const balanced = useMemo(() => {
    return transactions.reduce((prev, curr) => {
      if (curr.type === "deposit") return (prev += curr.amount);
      else return (prev -= curr.amount);
    }, 0);
  }, [transactions]);

  const addTransaction = (type) => {
    setError(null);

    const isPurge = type === "purge";
    const numberAmount = formatNumber(amount);

    if (numberAmount === 0 && !isPurge) {
      setError("Amount can not be zero");
      return;
    }
    if (balanced === 0 && isPurge) {
      setError("Your balanced is zero");
      return;
    }
    if (balanced < numberAmount && type === "withdraw") {
      setError("Your balance is not enough");
      return;
    }

    const transaction = {
      id: +new Date(),
      type,
      amount: isPurge ? balanced : formatNumber(amount),
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [...prev, transaction]);
    onReset();
  };

  const resetTransaction = () => {
    setTransactions([]);
    saveTransactions([]);
  };

  useEffect(() => {
    if (transactions.length === 0) return;

    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    const initialTransactions = getTransactions();
    setTransactions(initialTransactions);
  }, []);

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
            onChange={onChange}
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
              className="!p-0 rounded-full !w-12 !h-12"
              onClick={resetTransaction}
            >
              <ListRestart />
            </Button>
          </div>

          {transactions.length === 0 ? (
            <div className="grid place-content-center py-24">
              <img src="/assets/empty.png" alt="Empty Transaction" />
            </div>
          ) : (
            <div className="space-y-2 mt-3 pb-2 pr-4 overflow-y-auto h-[60vh] w-max">
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
