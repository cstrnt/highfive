"use client";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { type QuestionType, type Question } from "~/lib/types";

export function ChoiceQuestion<
  T extends Question & {
    type: QuestionType.Choice;
  },
>({
  question,
  value,
  onChange,
}: {
  question: T;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <RadioGroup className="flex gap-4" value={value} onValueChange={onChange}>
      {question.choices.map((choice) => (
        <div key={choice.value} className="aspect-square w-full max-w-sm">
          <RadioGroupItem
            value={choice.value}
            id={choice.value}
            className="peer sr-only"
          />
          <Label
            htmlFor={choice.value}
            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex h-full flex-col items-center justify-center rounded-md border-2 p-4 text-center"
          >
            {choice.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
