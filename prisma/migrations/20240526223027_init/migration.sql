-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "studentIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Theory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Practice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "solvedBy" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "practiceId" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackBoxTest" (
    "id" SERIAL NOT NULL,
    "isExample" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "batchInput" TEXT[],
    "batchOutput" TEXT[],
    "exerciseId" INTEGER,

    CONSTRAINT "BlackBoxTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrayBoxTest" (
    "id" SERIAL NOT NULL,
    "isExample" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "functionName" TEXT NOT NULL,
    "functionArgs" TEXT[],
    "functionResponse" TEXT NOT NULL,
    "exerciseId" INTEGER,

    CONSTRAINT "GrayBoxTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteBoxTest" (
    "id" SERIAL NOT NULL,
    "isExample" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "test" TEXT NOT NULL,
    "exerciseId" INTEGER,

    CONSTRAINT "WhiteBoxTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TheoryToPractice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Theory_name_idx" ON "Theory"("name");

-- CreateIndex
CREATE INDEX "Practice_name_idx" ON "Practice"("name");

-- CreateIndex
CREATE INDEX "Exercise_name_idx" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TheoryToPractice_AB_unique" ON "_TheoryToPractice"("A", "B");

-- CreateIndex
CREATE INDEX "_TheoryToPractice_B_index" ON "_TheoryToPractice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToTag_AB_unique" ON "_ExerciseToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToTag_B_index" ON "_ExerciseToTag"("B");

-- AddForeignKey
ALTER TABLE "Theory" ADD CONSTRAINT "Theory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_practiceId_fkey" FOREIGN KEY ("practiceId") REFERENCES "Practice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlackBoxTest" ADD CONSTRAINT "BlackBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrayBoxTest" ADD CONSTRAINT "GrayBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhiteBoxTest" ADD CONSTRAINT "WhiteBoxTest_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheoryToPractice" ADD CONSTRAINT "_TheoryToPractice_A_fkey" FOREIGN KEY ("A") REFERENCES "Practice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TheoryToPractice" ADD CONSTRAINT "_TheoryToPractice_B_fkey" FOREIGN KEY ("B") REFERENCES "Theory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTag" ADD CONSTRAINT "_ExerciseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToTag" ADD CONSTRAINT "_ExerciseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
