/*
  Warnings:

  - You are about to drop the column `academicYearId` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `academicYearId` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the `AcademicYear` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `year` to the `Narrative` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FALL', 'SPRING', 'SUMMER1', 'SUMMER2');

-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_academicYearId_fkey";

-- DropForeignKey
ALTER TABLE "Narrative" DROP CONSTRAINT "Narrative_academicYearId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "academicYearId",
DROP COLUMN "date",
ADD COLUMN     "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "semester" "Semester" NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Narrative" DROP COLUMN "academicYearId",
ADD COLUMN     "dateModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "year" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AcademicYear";
