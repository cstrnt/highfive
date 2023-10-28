/*
  Warnings:

  - Added the required column `position_inForm` to the `QuestionForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionForm" ADD COLUMN     "position_inForm" INTEGER NOT NULL;
