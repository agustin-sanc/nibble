"use server";

import { database } from "@/app/_cross/database";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const deletePractice = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can edit practices");

  const practice = await database.practice.findUnique({
    where: { id },
  });

  if (!practice) throw new Error("Practice not found");

  const course = await database.course.findFirst({
    where: { id: practice.courseId, ownerId: user.id },
  });

  if (!course)
    throw new Error("Course doesn't exist or professor isn't the owner");

  await database.practice.delete({
    where: { id },
  });

  revalidatePath("/practices");
  redirect("/practices");
};
