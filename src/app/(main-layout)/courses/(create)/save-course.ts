"use server";

import {
  createCourseFormSchema,
  type CreateCourseFormSchema,
} from "@/app/(main-layout)/courses/(create)/create-course-form-schema";
import { prisma } from "@/app/_cross/prisma";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { assureUserIsProfessor } from "@/app/_cross/auth/assure-user-is-professor";

const validateInput = (input: CreateCourseFormSchema) => {
  const validatedFields = createCourseFormSchema.safeParse(input);

  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveCourse = async (input: CreateCourseFormSchema) => {
  const user = await getCurrentUser();
  assureUserIsProfessor(user);

  const ownerId = user.id;
  validateInput(input);

  return await prisma.course.create({ data: { ...input, ownerId } });
};
