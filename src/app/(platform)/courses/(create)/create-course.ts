"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { courseFormSchema } from "@/app/(platform)/courses/course-form-schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const validateInput = (data: z.infer<typeof courseFormSchema>) => {
  const { success } = courseFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const createCourse = async (data: z.infer<typeof courseFormSchema>) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can create courses");

  validateInput(data);

  const course = await database.course.create({
    data: { ...data, ownerId: user.id },
  });

  revalidatePath("/courses");
  redirect(`/courses/${course.id}`);
};
