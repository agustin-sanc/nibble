/*
  Warnings:

  - Added the required column `difficulty` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "difficulty" INTEGER NOT NULL;
