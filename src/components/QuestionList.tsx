"use client";

import { useState } from "react";
import { type Question } from "~/lib/types";
import { QuestionComponent } from "./Question";

export function QuestionList({
  questions,
  lastQuestionId,
}: {
  questions: Question[];
  lastQuestionId?: string;
}) {
  const questionStack = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    lastQuestionId
      ? questionStack.findIndex((q) => q.id === lastQuestionId)
      : 0,
  );

  const onSubmit = async (index: number) => {
    const nextCard = questionStack.at(index + 1);
    if (!nextCard) return;
    const nextCardDomNode = document.getElementById(nextCard.id);
    if (!nextCardDomNode) return;

    // TODO: mock loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    nextCardDomNode.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    setCurrentQuestionIndex(index + 1);
  };

  return (
    <div className="mx-auto max-w-xl space-y-8 py-8">
      {questionStack.map((question, i) => (
        <QuestionComponent
          key={question.id}
          question={question}
          onContinue={() => onSubmit(i)}
          onCardClick={(cardRef) => {
            if (i === currentQuestionIndex) return;
            if (!cardRef.current) return;
            cardRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            setCurrentQuestionIndex(i);
          }}
          isActive={i === currentQuestionIndex}
        />
      ))}
    </div>
  );
}
