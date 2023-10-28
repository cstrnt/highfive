"use client";

import { useRef, useState } from "react";
import { type Question } from "~/lib/types";
import { QuestionComponent } from "./Question";
import { api } from "~/trpc/react";
import { SuccessCard } from "./SuccessCard";
import confetti from "canvas-confetti";

export function QuestionList({
  questions,
  initialQuestionId,
}: {
  questions: Question[];
  initialQuestionId?: string;
}) {
  const successCardRef = useRef<HTMLDivElement>(null);
  const updateQuestion = api.question.updateQuestion.useMutation();

  const questionStack = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    initialQuestionId
      ? questionStack.findIndex((q) => q.id === initialQuestionId)
      : 0,
  );

  const showSuccessCard = currentQuestionIndex > questionStack.length - 1;

  const onSubmit = async (value: string | undefined, index: number) => {
    const currentQuestion = questionStack.at(currentQuestionIndex);
    if (!currentQuestion) return;

    await updateQuestion.mutateAsync({
      questionId: currentQuestion.id,
      answer: value,
    });

    const nextCard = questionStack.at(index + 1);

    if (index === questionStack.length - 1) {
      setCurrentQuestionIndex(index + 1);
      void confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      successCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      return;
    }

    const nextCardDomNode = nextCard
      ? document.getElementById(nextCard.id)
      : null;

    if (!nextCardDomNode) return;

    nextCardDomNode.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    setCurrentQuestionIndex(index + 1);
  };

  return (
    <div className="space-y-8">
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

      <SuccessCard ref={successCardRef} show={showSuccessCard} />
    </div>
  );
}
