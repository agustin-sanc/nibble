"use server";

import { database } from "@/app/_cross/database";
import { revalidatePath } from "next/cache";

export const addStudent = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  await database.course.update({
    where: { id: courseId },
    data: {
      studentIds: {
        push: userId,
      },
    },
  });

  revalidatePath(`/courses/${courseId}`);
};
