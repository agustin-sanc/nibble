"use server";

import { prisma } from "@/app/_cross/prisma";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { courseFormSchema } from "@/app/(main-layout)/courses/course-form-schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const validateInput = (data: z.infer<typeof courseFormSchema>) => {
  const { success } = courseFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const saveCourse = async (
  data: { id: number } & z.infer<typeof courseFormSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can create courses");

  validateInput(data);

  const course = await prisma.course.upsert({
    where: { id: data.id },
    update: data,
    create: { ...data, ownerId: user.id },
  });

  revalidatePath("/courses");

  if (!data.id) redirect(`/courses/${course.id}`);
};
