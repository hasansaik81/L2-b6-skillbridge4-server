/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");
