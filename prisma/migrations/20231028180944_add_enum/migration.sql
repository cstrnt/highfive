/*
  Warnings:

  - Changed the type of `answer_type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'NUMBER', 'DATE', 'BOOLEAN');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answer_type",
ADD COLUMN     "answer_type" "QuestionType" NOT NULL;
