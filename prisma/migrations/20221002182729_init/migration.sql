-- CreateEnum
CREATE TYPE "SabbaticalOption" AS ENUM ('NO', 'SEMESTER', 'YEAR');

-- CreateEnum
CREATE TYPE "NarrativeCategory" AS ENUM ('SUMMARY', 'SERVICE', 'RESEARCH', 'TEACHING');

-- CreateEnum
CREATE TYPE "ActivityCategory" AS ENUM ('SERVICE', 'RESEARCH', 'TEACHING');

-- CreateEnum
CREATE TYPE "SignificanceLevel" AS ENUM ('MAJOR', 'SIGNIFICANT', 'MINOR');

-- CreateTable
CREATE TABLE "ProfessorInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "teachingPercent" DOUBLE PRECISION NOT NULL,
    "researchPercent" DOUBLE PRECISION NOT NULL,
    "servicePercent" DOUBLE PRECISION NOT NULL,
    "sabbatical" "SabbaticalOption" NOT NULL,
    "teachingReleaseExplanation" TEXT NOT NULL,

    CONSTRAINT "ProfessorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "academicYearId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "significance" "SignificanceLevel" NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Narrative" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "academicYearId" INTEGER NOT NULL,
    "category" "NarrativeCategory" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Narrative_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessorInfo" ADD CONSTRAINT "ProfessorInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Narrative" ADD CONSTRAINT "Narrative_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Narrative" ADD CONSTRAINT "Narrative_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "AcademicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
