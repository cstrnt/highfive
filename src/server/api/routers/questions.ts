import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { QuestionsAppView } from "../model/questionsAppView";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        language: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const questions = await ctx.db.questionForm.findMany({
        where: {
          formId: input.formId,
        },
        include: {
          question: true,
        },
      });

      const lastQuestionId = await ctx.db.userAnswers.findMany({
        where: {
          userId: ctx.session.user.id,
          questionId: {
            in: questions.map((question) => question.questionId),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });

      const questionsAppView = new Array<QuestionsAppView>(questions.length);

      let i = 0;
      for (const question of questions) {
        const dbQuestion = await ctx.db.question.findFirstOrThrow({
          where: {
            id: question.questionId,
          },
        });

        const dbText = await ctx.db.text.findFirstOrThrow({
          where: {
            id: dbQuestion.question_textId,
          },
        });

        const dbTextTranslation = await ctx.db.textTranslation.findFirstOrThrow(
          {
            where: {
              textId: dbText.id,
              language: input.language,
            },
          },
        );

        const questionAppView: QuestionsAppView = {
          id: question.id,
          text: dbTextTranslation.translation,
          type: dbQuestion.answer_type,
        };

        questionsAppView[i++] = questionAppView;
      }

      return { questions, initialQuestionId: lastQuestionId[0]?.id };
    }),
  updateQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.string(),
        answer: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const question = await ctx.db.questionForm.findUnique({
        where: {
          id: input.questionId,
        },
      });
      if (!question) {
        throw new Error("question not found");
      }
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("user not found");
      }
      if (!input.answer) {
        throw new Error("answer not found");
      }

      const answer = await ctx.db.userAnswers.create({
        data: {
          questionId: input.questionId,
          userId: ctx.session.user.id,
          answer: input.answer,
        },
      });

      return { answer };
    }),
});
