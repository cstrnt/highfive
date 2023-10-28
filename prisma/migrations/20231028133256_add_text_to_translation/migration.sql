/*
  Warnings:

  - Added the required column `translation` to the `TextTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TextTranslation" ADD COLUMN     "translation" TEXT NOT NULL;
