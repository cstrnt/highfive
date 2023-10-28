import { Prisma, PrismaClient } from "@prisma/client";
import { z } from "zod";
import { QUESTIONS } from "~/lib/data";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ formId: z.string(), userId: z.string() }))
    .query(async ({ input }) => {
      // get questions from db for the given id (fragebogen id / formularId
      // return questions

      const prisma = new PrismaClient()
      const questions = await prisma.questionForm.findMany({
        where: {
          formId: input.formId
        },
      })
      const lastQuestionId = await prisma.userAnswers.findMany(
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
    .input(z.object({ id: z.string(), answer: z.string().optional() }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        `Updated Question with id ${input.id} with answer ${input.answer ?? "Unset"
        }`,
      );
    }),
});
