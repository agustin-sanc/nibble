-- DropForeignKey
ALTER TABLE "Practice" DROP CONSTRAINT "Practice_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
