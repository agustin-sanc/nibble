-- DropForeignKey
ALTER TABLE "BlackBoxTest" DROP CONSTRAINT "BlackBoxTest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_practiceId_fkey";

-- DropForeignKey
ALTER TABLE "GrayBoxTest" DROP CONSTRAINT "GrayBoxTest_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Theory" DROP CONSTRAINT "Theory_courseId_fkey";

-- DropForeignKey
ALTER TABLE "WhiteBoxTest" DROP CONSTRAINT "WhiteBoxTest_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "Theory" ADD CONSTRAINT "Theory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackBoxTest" ADD CONSTRAINT "BlackBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrayBoxTest" ADD CONSTRAINT "GrayBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteBoxTest" ADD CONSTRAINT "WhiteBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
