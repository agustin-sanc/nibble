"use server";

import { database } from "@/app/_cross/database";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const deleteExercise = async (id: string) => {
  // TODO: As we only use the user id, maybe can receive it in parameters instead of fetch the entire user.
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  // TODO: Review if we can get rid of this validation as we have the one for owner below.
  if (!user.isProfessor) throw new Error("Only professors can edit practices");

  // TODO: Review what happens when the user isn't the course owner.
  // TODO: Review what happens when the practice doesn't exist, user should be redirected to the not found page.

  const exercise = await database.exercise.findUnique({
    where: { id },
    include: {
      practice: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!exercise) throw new Error("Exercise not found");

  await database.exercise.delete({
    where: {
      id,
      practice: {
        course: {
          ownerId: user.id,
        },
      },
    },
  });

  revalidatePath(
    `/courses/${exercise.practice.course.id}/practices/${exercise.practice.id}`
  );
  
  redirect(
    `/courses/${exercise.practice.course.id}/practices/${exercise.practice.id}`
  );
};
