"use server";

import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { database } from "@/app/_cross/database";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import type * as z from "zod";
import { createTheoryFormSchema } from "../../(create)/create-theory-form-schema";

const validateInput = (data: z.infer<typeof createTheoryFormSchema>) => {
  const { success } = createTheoryFormSchema.safeParse(data);

  if (!success) throw new Error("Invalid data");
};

export const editTheory = async (
  data: { id: string } & z.infer<typeof createTheoryFormSchema>,
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can edit theories");

  validateInput(data);

  // TODO: Verify that only the owner of the course can edit the practice.
  const theory = await database.theory.update({
    where: { id: data.id, course: { ownerId: user.id } },
    data,
  });

  if (!theory) notFound();

  revalidatePath(`/courses/${theory.courseId}`);

  // TODO: Review if this revalidation if necessary.
  revalidatePath(`/courses/${theory.courseId}/theories`);
};
