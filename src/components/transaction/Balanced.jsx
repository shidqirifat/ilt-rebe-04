import { formatCurrency } from "@/utils/currency";

export default function Balanced({ children }) {
  return (
    <h2 className="text-slate-700 font-normal text-lg">
      Your Balance:{" "}
      <span className="text-green-500 font-semibold">
        {formatCurrency(children)}
      </span>
    </h2>
  );
}
