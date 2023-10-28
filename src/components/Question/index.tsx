"use client";

import { type RefObject, useRef, useState } from "react";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { DatePicker } from "../DatePicker";
import { QuestionType, type Question } from "~/lib/types";
import { QuestionMarkCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "~/components/ui/tooltip";

export function QuestionComponent({
  question,
  onContinue,
  isActive,
  onCardClick,
}: {
  question: Question;
  onContinue: (value: string | undefined) => void | Promise<void>;
  isActive: boolean;
  onCardClick?: (ref: RefObject<HTMLDivElement>) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<Date | number | string | undefined>(
    undefined,
  );

  const cardContent = () => {
    switch (question.type) {
      case QuestionType.Text: {
        return (
          <Input
            type="text"
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            minLength={question.minLength}
            maxLength={question.maxLength}
          />
        );
      }
      case QuestionType.Number: {
        return (
          <Input
            type="number"
            value={String(value)}
            onChange={(e) => setValue(e.target.valueAsNumber)}
            min={question.minValue}
            max={question.maxValue}
          />
        );
      }
      case QuestionType.Date: {
        return (
          <DatePicker value={value as Date | undefined} onChange={setValue} />
        );
      }
      case QuestionType.Choice: {
        return (
          <ChoiceQuestion
            question={question}
            onChange={(s) => setValue(s)}
            value={value as string}
          />
        );
      }
    }
    question satisfies never;
  };

  const onContinueClick = async () => {
    setIsSubmitting(true);
    let stringifiedValue: string | undefined = undefined;

    if (question.type === QuestionType.Date) {
      stringifiedValue = (value as Date)?.toISOString();
    } else {
      stringifiedValue = value !== undefined ? String(value) : undefined;
    }
    await onContinue(stringifiedValue);
    setIsSubmitting(false);
  };

  return (
    <Card
      id={question.id}
      ref={cardRef}
      className="relative max-w-lg transition duration-200 ease-in-out data-[active=false]:cursor-default data-[active=false]:opacity-30 data-[active=false]:shadow-none data-[active=false]:grayscale"
      data-active={isActive}
      onClick={() => {
        if (onCardClick) onCardClick(cardRef);
      }}
    >
      <CardHeader>
        <CardTitle>
          {question.title}{" "}
          {question.isRequired && <span className="text-primary">*</span>}
        </CardTitle>
        {question.helpText && (
          <div className="text-muted-foreground absolute right-4 top-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <QuestionMarkCircledIcon />
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-muted text-muted-foreground max-w-xs"
                >
                  <p>{question.helpText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        <CardDescription>{question.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{cardContent()}</CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onContinueClick} disabled={isSubmitting}>
          {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Weiter
        </Button>
      </CardFooter>
    </Card>
  );
}
