-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FACULTY', 'MERIT_COMMITTEE_MEMBER', 'MERIT_COMMITTEE_HEAD', 'DEAN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "preferred_name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FACULTY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
