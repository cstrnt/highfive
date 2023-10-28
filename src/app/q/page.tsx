import { QuestionList } from "~/components/QuestionList";
import { api } from "~/trpc/server";

export default async function QPage() {
  const { lastQuestionId, questions } = await api.question.getQuestions.query({
    id: "REPLACE_ME",
  });
  return (
    <div className="mx-auto max-w-xl space-y-8 p-8">
      <QuestionList questions={questions} lastQuestionId={lastQuestionId} />
    </div>
  );
}
