"use server";

import {
  createCourseFormSchema,
  type CreateCourseFormSchema,
} from "@/app/(main-layout)/courses/(create)/create-course-form-schema";
import { prisma } from "@/app/_cross/prisma";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { verifyUserIsProfessor } from "@/app/_cross/auth/verify-user-is-professor";

const validateInput = (input: CreateCourseFormSchema) => {
  const validatedFields = createCourseFormSchema.safeParse(input);

  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveCourse = async (input: CreateCourseFormSchema) => {
  const user = await getCurrentUser();
  const ownerId = user.id;

  verifyUserIsProfessor(user);
  validateInput(input);

  return await prisma.course.create({ data: { ...input, ownerId } });
};
