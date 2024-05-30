/*
  Warnings:

  - The primary key for the `BlackBoxTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GrayBoxTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Practice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Theory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WhiteBoxTest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `exerciseId` on table `BlackBoxTest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `practiceId` on table `Exercise` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exerciseId` on table `GrayBoxTest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `exerciseId` on table `WhiteBoxTest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BlackBoxTest" DROP CONSTRAINT "BlackBoxTest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "GrayBoxTest" DROP CONSTRAINT "GrayBoxTest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Practice" DROP CONSTRAINT "Practice_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Theory" DROP CONSTRAINT "Theory_courseId_fkey";

-- DropForeignKey
ALTER TABLE "WhiteBoxTest" DROP CONSTRAINT "WhiteBoxTest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToTag" DROP CONSTRAINT "_ExerciseToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToTag" DROP CONSTRAINT "_ExerciseToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_TheoryToPractice" DROP CONSTRAINT "_TheoryToPractice_A_fkey";

-- DropForeignKey
ALTER TABLE "_TheoryToPractice" DROP CONSTRAINT "_TheoryToPractice_B_fkey";

-- AlterTable
ALTER TABLE "BlackBoxTest" DROP CONSTRAINT "BlackBoxTest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET NOT NULL,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BlackBoxTest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BlackBoxTest_id_seq";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "practiceId" SET NOT NULL,
ALTER COLUMN "practiceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Exercise_id_seq";

-- AlterTable
ALTER TABLE "GrayBoxTest" DROP CONSTRAINT "GrayBoxTest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET NOT NULL,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GrayBoxTest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GrayBoxTest_id_seq";

-- AlterTable
ALTER TABLE "Practice" DROP CONSTRAINT "Practice_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Practice_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Practice_id_seq";

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tag_id_seq";

-- AlterTable
ALTER TABLE "Theory" DROP CONSTRAINT "Theory_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Theory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Theory_id_seq";

-- AlterTable
ALTER TABLE "WhiteBoxTest" DROP CONSTRAINT "WhiteBoxTest_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "exerciseId" SET NOT NULL,
ALTER COLUMN "exerciseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WhiteBoxTest_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WhiteBoxTest_id_seq";

-- AlterTable
ALTER TABLE "_ExerciseToTag" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_TheoryToPractice" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Theory" ADD CONSTRAINT "Theory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackBoxTest" ADD CONSTRAINT "BlackBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrayBoxTest" ADD CONSTRAINT "GrayBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteBoxTest" ADD CONSTRAINT "WhiteBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheoryToPractice" ADD CONSTRAINT "_TheoryToPractice_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheoryToPractice" ADD CONSTRAINT "_TheoryToPractice_B_fkey" FOREIGN KEY ("B") REFERENCES "Theory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTag" ADD CONSTRAINT "_ExerciseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTag" ADD CONSTRAINT "_ExerciseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
