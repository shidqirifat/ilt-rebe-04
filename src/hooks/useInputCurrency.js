import { formatNominal } from "@/utils/currency";
import { useState } from "react";

export default function useInputCurrency() {
  const [amount, setAmount] = useState("0");
  const [error, setError] = useState(null);

  const onChange = (event) => {
    const { value } = event.target;
    if (value.match(/[^0-9.]/g)) return;

    setAmount(formatNominal(value));
  };

  const onReset = () => {
    setAmount("0");
  };

  return { error, amount, setError, onChange, onReset };
}
