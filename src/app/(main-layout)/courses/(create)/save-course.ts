"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { courseFormSchema } from "@/app/(main-layout)/courses/course-form-schema";

const validateInput = (input: z.infer<typeof courseFormSchema>) => {
  const validatedFields = courseFormSchema.safeParse(input);

  if (!validatedFields.success) throw new Error("Invalid input");
};

export const saveCourse = async (input: z.infer<typeof courseFormSchema>) => {
  const user = await getCurrentUser();

  if (!user?.isProfessor) throw new Error("Only professors can create courses");

  validateInput(input);

  return await prisma.course.create({ data: { ...input, ownerId: user.id } });
};
