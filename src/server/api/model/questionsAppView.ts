import { type QuestionType } from "@prisma/client";

export type QuestionsAppView = {
  id: string;
  text: string;
  type: QuestionType;
};
