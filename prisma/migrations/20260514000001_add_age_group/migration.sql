-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('CHILD', 'ADULT_18_65', 'ADULT_66_80', 'ADULT_81_PLUS');

-- AlterTable
ALTER TABLE "Request" ADD COLUMN "ageGroup" "AgeGroup";
