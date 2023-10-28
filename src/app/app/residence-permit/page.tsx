import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuestionList } from "~/components/QuestionList";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function QPage() {
  const session = await getServerAuthSession();

  if (!session) return redirect("/app?screen=login");

  const { initialQuestionId, questions } =
    await api.question.getQuestions.query({
      formId: "REPLACE_ME",
      language: "en",
    });

  if (questions.length === 0) {
    return redirect("/app/home");
  }

  return (
    <div className="container mx-auto py-8">
      <nav className="mb-6 flex items-center space-x-4">
        <Link href="/app/home">
          <ChevronLeftIcon className="h-8 w-8" />
        </Link>
        <h1 className="text-3xl font-bold">Residence Permit</h1>
      </nav>
      <QuestionList questions={[]} initialQuestionId={initialQuestionId} />
    </div>
  );
}
