import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(
      z.object({
        // omit for now since we only have one form
        // formId: z.string(),
        language: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const questions = await ctx.db.questionForm.findMany({
        include: {
          question: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      const userAnswers = await ctx.db.userAnswers.findMany({
        where: {
          userId: ctx.session.user.id,
          questionId: {
            in: questions.map((question) => question.questionId),
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      const translations = await ctx.db.textTranslation.findMany({
        where: {
          textId: {
            in: questions.map((question) => question.question.question_textId),
          },
          language: input.language,
        },
      });

      const questionsWithTranslation = questions.flatMap((question) => {
        const translation = translations.find(
          (translation) =>
            translation.textId === question.question.question_textId,
        );

        const userAnswer = userAnswers.find(
          (answer) => answer.questionId === question.questionId,
        );

        if (!translation) return [];
        return {
          id: question.questionId,
          title: translation?.translation,
          type: question.question.answer_type,
          answer: userAnswer?.answer,
        };
      });

      return {
        questions: questionsWithTranslation,
        initialQuestionId: userAnswers[0]?.questionId,
      };
    }),
  updateQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        answer: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.db.question.findUnique({
        where: {
          id: input.questionId,
        },
      });
      if (!question) {
        throw new Error("question not found");
      }

      const answer = await ctx.db.userAnswers.create({
        data: {
          questionId: input.questionId,
          userId: ctx.session.user.id,
          answer: input.answer ?? "",
        },
      });

      return { answer };
    }),
});
