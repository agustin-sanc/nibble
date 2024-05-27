"use server";

import { prisma } from "@/app/_cross/prisma";
import { getCurrentUser } from "@/app/_cross/auth/get-current-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const deleteCourse = async (id: number) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  if (!user.isProfessor) throw new Error("Only professors can edit courses");

  await prisma.course.delete({
    where: { id, ownerId: user.id },
  });

  revalidatePath("/courses");
  redirect("/courses");
};
