/*
  Warnings:

  - You are about to drop the column `tutorId` on the `subjects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_tutorId_fkey";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "tutorId";
