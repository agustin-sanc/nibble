"use server";

import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { database } from "@/app/_cross/database";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTheory = async (id: string) => {
  // TODO: As we only use the user id, maybe can receive it in parameters instead of fetch the entire user.
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  // TODO: Review if we can get rid of this validation as we have the one for owner below.
  if (!user.isProfessor) throw new Error("Only professors can delete theories");

  // TODO: Review what happens when the user isn't the course owner.
  // TODO: Review what happens when the practice doesn't exist, user should be redirected to the not found page.

  await database.theory.delete({
    where: {
      id,
      course: {
        ownerId: user.id,
      },
    },
  });

  revalidatePath("/theories");
  redirect("/theories");
};
