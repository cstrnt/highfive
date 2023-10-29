"use client";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { type Question } from "~/lib/types";
import { type QuestionType } from "@prisma/client";

export function ChoiceQuestion<
  T extends Question & {
    type: (typeof QuestionType)["BOOLEAN"];
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
    <RadioGroup
      className="grid grid-cols-2 gap-4"
      value={value}
      onValueChange={onChange}
    >
      <div className="aspect-square w-full max-w-sm">
        <RadioGroupItem
          value="true"
          id={`${question.id}-true`}
          className="peer sr-only"
        />
        <Label
          htmlFor={`${question.id}-true`}
          className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          {question.trueText ?? "Yes"}
        </Label>
      </div>
      <div className="aspect-square w-full max-w-sm">
        <RadioGroupItem
          value="false"
          id={`${question.id}-false`}
          className="peer sr-only"
        />
        <Label
          htmlFor={`${question.id}-false`}
          className="flex h-full flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          {question.falseText ?? "No"}
        </Label>
      </div>
    </RadioGroup>
  );
}
