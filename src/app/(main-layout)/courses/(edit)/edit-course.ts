"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { courseFormSchema } from "@/app/(main-layout)/courses/course-form-schema";

const editCourseInputSchema = z.object({
  ...courseFormSchema.shape,
  id: z.number(),
});

const validateInput = (input: z.infer<typeof editCourseInputSchema>) => {
  const validatedFields = editCourseInputSchema.safeParse(input);

  if (!validatedFields.success) throw new Error("Invalid input");
};

export const editCourse = async (
  input: z.infer<typeof editCourseInputSchema>,
) => {
  const { name, description, id } = input;
  const user = await getCurrentUser();

  if (!user?.isProfessor) throw new Error("Only professors can create courses");

  validateInput(input);

  return await prisma.course.update({
    where: { id },
    data: { name, description, ownerId: user.id },
  });
};
