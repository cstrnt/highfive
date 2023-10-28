/*
  Warnings:

  - Added the required column `answer_type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId_inForm` to the `QuestionForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answer_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "QuestionForm" ADD COLUMN     "questionId_inForm" TEXT NOT NULL;
