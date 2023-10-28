/*
  Warnings:

  - You are about to drop the column `name_textId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `question_textId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "name_textId",
ADD COLUMN     "question_textId" TEXT NOT NULL;
