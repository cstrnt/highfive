"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export const DatePicker = React.forwardRef<
  HTMLButtonElement,
  {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
  }
>(({ onChange, value }, ref) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant={"outline"}
          className={cn(
            "w-full justify-start py-6 text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>Wählen Sie ein Datum</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = "DatePicker";
