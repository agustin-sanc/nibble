"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { courseFormSchema } from "@/app/(platform)/courses/course-form-schema";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

const validateInput = (data: z.infer<typeof courseFormSchema>) => {
  const { success } = courseFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const editTheory = async (
  data: { id: string } & z.infer<typeof courseFormSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can edit practices");

  validateInput(data);

  // TODO: Verify that only the owner of the course can edit the practice.
  const practice = await database.practice.update({
    where: { id: data.id, course: { ownerId: user.id } },
    data,
  });

  if (!practice) notFound();

  revalidatePath(`/courses/${practice.courseId}`);

  // TODO: Review if this revalidation if necessary.
  revalidatePath(`/courses/${practice.courseId}/practices`);
};
