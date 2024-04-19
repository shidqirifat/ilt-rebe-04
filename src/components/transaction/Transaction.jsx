import { formatCurrency } from "@/utils/currency";
import { cn } from "@/utils/utils";
import dayjs from "dayjs";

const Label = ({ children }) => {
  return (
    <div
      className={cn("py-[2px] px-3 rounded-md w-max", {
        "bg-sky-400": children === "deposit",
        "bg-pink-400": children === "withdraw",
        "bg-orange-400": children === "purge",
      })}
    >
      <h4 className="text-white font-normal text-xs capitalize leading-4">
        {children}
      </h4>
    </div>
  );
};

const DisplayAmount = ({ transaction }) => {
  const isDeposit = transaction.type === "deposit";

  return (
    <h3
      className={cn("font-medium text-base leading-5", {
        "text-green-500": isDeposit,
        "text-red-500": !isDeposit,
      })}
    >
      {!isDeposit && "-"}
      {formatCurrency(transaction.amount)}
    </h3>
  );
};

export default function Transaction({ transaction }) {
  return (
    <div className="w-72 p-3 border border-slate-100 rounded-md shadow bg-white">
      <div className="flex items-center justify-between">
        <DisplayAmount transaction={transaction} />
        <Label>{transaction.type}</Label>
      </div>

      <div className="mt-1">
        <h4 className="text-slate-700 font-normal text-sm">
          📅 {dayjs(transaction.date).format("dddd, DD/MM/YYYY HH:mm:ss")}
        </h4>
      </div>
    </div>
  );
}
