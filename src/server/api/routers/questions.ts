import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ formId: z.string(), userId: z.string(), language: z.string() }))
    .query(async ({ input, ctx }) => {
      // get questions from db for the given id (fragebogen id / formularId
      // return questions

      const questions = await ctx.db.questionForm.findMany({
        where: {
          formId: input.formId
        },
      })
      const lastQuestionId = await ctx.db.userAnswers.findMany(
        {
          where: {
            userId: input.userId, questionId: {
              in: questions.map(question => question.questionId)
            }
          }
        }
      )

      return { questions, lastQuestionId };
    }),
  updateQuestion: protectedProcedure
    .input(z.object({ questionId: z.string(), userId: z.string(), answer: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      
      const question = await ctx.db.questionForm.findUnique({
        where: {
          id: input.questionId
        }
      });
      if (!question) {
        throw new Error("question not found");
      }
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId
        }
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
          userId: input.userId,
          answer: input.answer
        }
      });


      return { answer };
    }),
});
