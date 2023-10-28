import { type QuestionType } from "~/lib/types";

export type QuestionsAppView = {
    id: string,
    text: string,
    type: QuestionType,
}