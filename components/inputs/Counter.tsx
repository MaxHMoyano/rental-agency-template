import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";

export interface CounterProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, value, onChange }: CounterProps) => {
  const onIncrement = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onDecrement = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center gap-2 w-full justify-between">
      <h2 className="font-semibold text-neutral-600 text-lg">{title}</h2>
      <div className="flex flex-row items-center justify-between bg-accent rounded-md">
        <button
          type="button"
          className="p-3 rounded-md bg-accent"
          onClick={onDecrement}
        >
          <Minus />
        </button>
        <span className="font-semibold text-lg px-4">{value}</span>
        <button
          type="button"
          className="p-3 rounded-md bg-accent"
          onClick={onIncrement}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
