import { z } from "zod";
import { QUESTIONS } from "~/lib/data";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getQuestions: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({}) => {
      // get questions from db for the given id (fragebogen id / formularId
      // return questions

      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { questions: QUESTIONS, lastQuestionId: QUESTIONS[0]?.id };
    }),
  updateQuestion: protectedProcedure
    .input(z.object({ id: z.string(), answer: z.string().optional() }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(
        `Updated Question with id ${input.id} with answer ${
          input.answer ?? "Unset"
        }`,
      );
    }),
});
