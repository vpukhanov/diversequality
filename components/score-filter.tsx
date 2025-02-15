"use client";

import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export type ScoreFilterValue = "all" | "positive" | "negative";

type Props = {
  value: ScoreFilterValue;
  onChange: (value: ScoreFilterValue) => void;
};

const valueToTitle: [ScoreFilterValue, string][] = [
  ["all", "All"],
  ["positive", "Positive"],
  ["negative", "Negative"],
];

export default function ScoreFilter({ value, onChange }: Props) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="flex rounded-full bg-white p-1 font-sans shadow-sm"
    >
      {valueToTitle.map(([value, title]) => (
        <div className="flex items-center" key={value}>
          <RadioGroupItem value={value} id={value} className="peer sr-only" />
          <Label
            htmlFor={value}
            className="peer-data-[state=checked]:bg-secondary peer-data-[state=checked]:text-secondary-foreground cursor-pointer rounded-full px-3 py-2 font-semibold transition-all duration-200 ease-in-out"
          >
            {title}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
