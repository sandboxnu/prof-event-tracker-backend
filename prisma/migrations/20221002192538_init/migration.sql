/*
  Warnings:

  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProfessorInfo" ALTER COLUMN "teachingReleaseExplanation" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "title",
ALTER COLUMN "preferred_name" DROP NOT NULL;
