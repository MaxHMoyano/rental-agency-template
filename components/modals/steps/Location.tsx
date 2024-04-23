import useCountries, { FormattedCountry } from "@/hooks/useCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";

interface LocationStepProps {
  value?: FormattedCountry;
  onChange: (value: FormattedCountry | undefined) => void;
}

const LocationStep = ({ value, onChange }: LocationStepProps) => {
  const { getAll, getByValue } = useCountries();
  return (
    <div className="flex flex-col gap-2">
      <div className="my-2">
        <h2 className="text-xl font-semibold">
          Select a region where your property is located
        </h2>
      </div>
      <div>
        <Select
          value={value && value.value}
          onValueChange={(v) => onChange(getByValue(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Anywhere" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {getAll().map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  <span className="flex gap-2 items-center">
                    <span>{country.flag}</span>
                    <span>{country.label},</span>
                    <span className="text-neutral-400">{country.region}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationStep;
