import { type Question, QuestionType } from "./types";

export const QUESTIONS: Array<Question> = [
  {
    id: "1",
    type: QuestionType.Text,
    title: "Wie ist Ihr Name?",
    subtitle:
      "Bitte geben Sie Ihren vollen Namen inklusive Zweit- und Nachnamen an.",
    isRequired: true,
  },
  {
    id: "2",
    type: QuestionType.Number,
    title: "Wie alt sind Sie?",
    helpText: "Bitte geben Sie Ihr Alter in Jahren an.",
  },
  {
    id: "3",
    type: QuestionType.Date,
    title: "Wann sind Sie geboren?",
  },
  {
    id: "4",
    type: QuestionType.Choice,
    title: "Wie geht es Ihnen?",
    choices: [
      {
        label: "Mir geht es gut.",
        value: "good",
      },
      {
        label: "Mir geht es nicht gut.",
        value: "bad",
      },
    ],
  },
];
