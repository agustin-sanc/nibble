"use server";

import { prisma } from "@/app/_cross/prisma";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import {
  createCourseFormSchema,
  type CreateCourseFormSchema,
} from "@/app/(main-layout)/courses/(create)/create-course-form-schema";

const validateInput = (input: CreateCourseFormSchema) => {
  const validatedFields = createCourseFormSchema.safeParse(input);

  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveCourse = async (input: CreateCourseFormSchema) => {
  const user = await getCurrentUser();

  if (!user?.isProfessor) throw new Error("Only professors can create courses");

  validateInput(input);

  return await prisma.course.create({ data: { ...input, ownerId: user.id } });
};
