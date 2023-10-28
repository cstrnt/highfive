"use client";

import { useState } from "react";
import { type Question } from "~/lib/types";
import { QuestionComponent } from "./Question";
import { api } from "~/trpc/react";

export function QuestionList({
  questions,
  lastQuestionId,
}: {
  questions: Question[];
  lastQuestionId?: string;
}) {
  const updateQuestion = api.question.updateQuestion.useMutation();
  const questionStack = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    lastQuestionId
      ? questionStack.findIndex((q) => q.id === lastQuestionId)
      : 0,
  );

  const currentQuestion = questionStack.at(currentQuestionIndex);

  if (!currentQuestion) return null;

  const onSubmit = async (value: string | undefined, index: number) => {
    const nextCard = questionStack.at(index + 1);
    if (!nextCard) return;
    const nextCardDomNode = document.getElementById(nextCard.id);
    if (!nextCardDomNode) return;

    await updateQuestion.mutateAsync({
      id: currentQuestion.id,
      answer: value,
    });

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
          onContinue={(value) => onSubmit(value, i)}
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
