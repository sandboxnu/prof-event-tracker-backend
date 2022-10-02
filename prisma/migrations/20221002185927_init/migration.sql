/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProfessorInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProfessorInfo_userId_key" ON "ProfessorInfo"("userId");
