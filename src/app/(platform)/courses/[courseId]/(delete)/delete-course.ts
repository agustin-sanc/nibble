"use server";

import { database } from "@/app/_cross/database";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const deleteCourse = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can edit courses");

  await database.course.delete({
    where: { id, ownerId: user.id },
  });

  revalidatePath("/courses");
  redirect("/courses");
};
