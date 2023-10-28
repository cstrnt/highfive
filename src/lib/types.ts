export const enum QuestionType {
  Text = "text",
  Number = "number",
  Date = "date",
  Choice = "choice",
}

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
      type: QuestionType.Text;
      minLength?: number;
      maxLength?: number;
    }
  | {
      type: QuestionType.Number;
      minValue?: number;
      maxValue?: number;
    }
  | {
      type: QuestionType.Date;
    }
  | {
      type: QuestionType.Choice;
      choices: Array<{
        label: string;
        value: string;
        icon?: React.ReactNode;
      }>;
    }
);
