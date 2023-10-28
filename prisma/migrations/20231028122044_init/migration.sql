-- CreateTable
CREATE TABLE "Text" (
    "id" TEXT NOT NULL,
    "context" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextTranslation" (
    "id" TEXT NOT NULL,
    "textId" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "TextTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "name_textId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionForm" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,

    CONSTRAINT "QuestionForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name_textId" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TextTranslation" ADD CONSTRAINT "TextTranslation_textId_fkey" FOREIGN KEY ("textId") REFERENCES "Text"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionForm" ADD CONSTRAINT "QuestionForm_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionForm" ADD CONSTRAINT "QuestionForm_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
