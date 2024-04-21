import { Banknote, HandCoins, Landmark } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ButtonIcon = ({ onClick, children, icon }) => {
  const IconTransaction = icon;

  return (
    <Button variant="secondary" onClick={onClick}>
      <div className="flex items-center gap-1">
        <IconTransaction width={18} height={18} />
        <h4>{children}</h4>
      </div>
    </Button>
  );
};

export default function FormTransaction({
  error,
  value,
  onChange,
  addTransaction,
}) {
  return (
    <div className="mt-4">
      <Input
        placeholder="Insert amount"
        value={value}
        onChange={onChange}
        className="w-40 text-base"
      />
      {error && (
        <h4 className="text-red-500 text-sm font-normal leading-5">{error}</h4>
      )}

      <div className="flex gap-2 mt-2">
        <ButtonIcon icon={Landmark} onClick={() => addTransaction("deposit")}>
          Deposit
        </ButtonIcon>
        <ButtonIcon icon={Banknote} onClick={() => addTransaction("withdraw")}>
          Withdraw
        </ButtonIcon>
        <ButtonIcon icon={HandCoins} onClick={() => addTransaction("purge")}>
          Purge
        </ButtonIcon>
      </div>
    </div>
  );
}
