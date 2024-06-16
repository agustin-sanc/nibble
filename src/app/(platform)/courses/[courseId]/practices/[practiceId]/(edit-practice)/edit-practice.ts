"use server";

import { database } from "@/app/_cross/database";
import * as z from "zod";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { practiceFormSchema } from "@/app/(platform)/courses/[courseId]/practices/[practiceId]/practice-form-schema";

const validateInput = (data: z.infer<typeof practiceFormSchema>) => {
  const { success } = practiceFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const editPractice = async (
  data: { id: string } & z.infer<typeof practiceFormSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  validateInput(data);

  const practice = await database.practice.update({
    where: { id: data.id, course: { ownerId: user.id } },
    data,
  });

  if (!practice) notFound();

  revalidatePath(`/courses/${practice.courseId}`);
};
