/*
  Warnings:

  - You are about to drop the column `functionArgs` on the `GrayBoxTest` table. All the data in the column will be lost.
  - You are about to drop the column `functionResponse` on the `GrayBoxTest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[functionResponseId]` on the table `GrayBoxTest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `functionResponseId` to the `GrayBoxTest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FunctionArgType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'ARRAY');

-- AlterTable
ALTER TABLE "GrayBoxTest" DROP COLUMN "functionArgs",
DROP COLUMN "functionResponse",
ADD COLUMN     "functionResponseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FunctionArgument" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "FunctionArgType" NOT NULL,
    "grayBoxTestId" TEXT NOT NULL,

    CONSTRAINT "FunctionArgument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FunctionResponse" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "FunctionArgType" NOT NULL,

    CONSTRAINT "FunctionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FunctionArgument_grayBoxTestId_idx" ON "FunctionArgument"("grayBoxTestId");

-- CreateIndex
CREATE UNIQUE INDEX "GrayBoxTest_functionResponseId_key" ON "GrayBoxTest"("functionResponseId");

-- AddForeignKey
ALTER TABLE "GrayBoxTest" ADD CONSTRAINT "GrayBoxTest_functionResponseId_fkey" FOREIGN KEY ("functionResponseId") REFERENCES "FunctionResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunctionArgument" ADD CONSTRAINT "FunctionArgument_grayBoxTestId_fkey" FOREIGN KEY ("grayBoxTestId") REFERENCES "GrayBoxTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
