import { Input } from "@/components/ui/input";
import { CircleDollarSign } from "lucide-react";

export interface PriceStepProps {
  value: number;
  onChange: (value: number) => void;
}

const PriceStep = ({ value, onChange }: PriceStepProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="my-2">
        <h2 className="text-xl font-semibold">
          Lastly! Tell us how much you want to charge for your property
        </h2>
      </div>
      <div>
        <Input
          icon={CircleDollarSign}
          placeholder="In US dollars"
          type="number"
          onChange={(e) => onChange(Number(e.target.value))}
          value={value}
        />
      </div>
    </div>
  );
};

export default PriceStep;
