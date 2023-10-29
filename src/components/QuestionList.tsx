"use client";

import { useEffect, useRef, useState } from "react";
import { QuestionComponent } from "./Question";
import { api } from "~/trpc/react";
import { SuccessCard } from "./SuccessCard";
import confetti from "canvas-confetti";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

export function QuestionList({
  questions,
  initialQuestionId,
}: {
  questions: inferProcedureOutput<
    AppRouter["question"]["getQuestions"]
  >["questions"];
  initialQuestionId?: string;
}) {
  const successCardRef = useRef<HTMLDivElement>(null);
  const updateQuestion = api.question.updateQuestion.useMutation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => {
      const initialQuestionIndex = questions.findIndex(
        (q) => q.id === initialQuestionId,
      );

      if (initialQuestionIndex === -1) return 0;
      if (initialQuestionIndex > questions.length) return 0;
      return initialQuestionIndex + 1;
    },
  );

  useEffect(() => {
    if (!initialQuestionId) return;
    const idx = questions.findIndex((q) => q.id === initialQuestionId);
    const isLastQuestion = idx === questions.length - 1;
    if (isLastQuestion) return;

    const activeQuestion = document.getElementById(initialQuestionId);
    if (!activeQuestion) return;

    activeQuestion.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
    setCurrentQuestionIndex(idx);
  }, [initialQuestionId, questions]);

  const showSuccessCard = currentQuestionIndex > questions.length - 1;

  const onSubmit = async (value: string | undefined, index: number) => {
    const currentQuestion = questions.at(currentQuestionIndex);
    if (!currentQuestion) return;

    await updateQuestion.mutateAsync({
      questionId: currentQuestion.id,
      answer: value,
    });

    const nextCard = questions.at(index + 1);

    if (index === questions.length - 1) {
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
      {questions.map((question, i) => (
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
          initialValue={question.answer}
        />
      ))}

      <SuccessCard ref={successCardRef} show={showSuccessCard} />
    </div>
  );
}
