import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
        className="w-48 text-base"
      />
      {error && (
        <h4 className="text-red-500 text-sm font-normal leading-5">{error}</h4>
      )}

      <div className="flex gap-2 mt-2">
        <Button variant="secondary" onClick={() => addTransaction("deposit")}>
          Deposit
        </Button>
        <Button variant="secondary" onClick={() => addTransaction("withdraw")}>
          Withdraw
        </Button>
        <Button variant="secondary" onClick={() => addTransaction("purge")}>
          Purge
        </Button>
      </div>
    </div>
  );
}
