"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { forwardRef } from "react";

export const SuccessCard = forwardRef<
  HTMLDivElement,
  {
    show: boolean;
  }
>(({ show }, ref) => {
  return (
    <Card
      ref={ref}
      className="max-w-lg transition-opacity duration-200 ease-in-out data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
      data-visible={show}
    >
      <CardHeader>
        <CardTitle>Sie haben das Ziel erreicht!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sie haben alle Fragen beantwortet.</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Abschicken</Button>
      </CardFooter>
    </Card>
  );
});

SuccessCard.displayName = "SuccessCard";
