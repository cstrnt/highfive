import { type QuestionType } from "@prisma/client";

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  helpText?: string;
  image?: string;
  isRequired?: boolean;
  type: QuestionType;
} & (
  | {
      type: (typeof QuestionType)["TEXT"];
      minLength?: number;
      maxLength?: number;
    }
  | {
      type: (typeof QuestionType)["NUMBER"];
      minValue?: number;
      maxValue?: number;
    }
  | {
      type: (typeof QuestionType)["DATE"];
    }
  | {
      type: (typeof QuestionType)["BOOLEAN"];
      trueText?: string;
      falseText?: string;
    }
);
